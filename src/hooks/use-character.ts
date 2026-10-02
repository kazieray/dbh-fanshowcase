import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { characters, type CharacterId } from "@/data/characters";

type DesktopSlot = "left" | "active" | "right";

type DesktopCharacterRefs = Record<CharacterId, RefObject<HTMLDivElement | null>>;

type CharacterStageRefs = {
   mobileCharacterRef: RefObject<HTMLDivElement | null>;
   desktopCharacterRefs: DesktopCharacterRefs;
};

type CharacterInfoRefs = {
   nameRef: RefObject<HTMLHeadingElement | null>;
   metaRef: RefObject<HTMLDivElement | null>;
   descriptionRef: RefObject<HTMLParagraphElement | null>;
};

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

function getCharacterId(index: number) {
   return characters[index].id as CharacterId;
}

function getDesktopSlots(activeIndex: number) {
   const leftIndex = (activeIndex - 1 + characters.length) % characters.length;
   const rightIndex = (activeIndex + 1) % characters.length;

   return {
      [getCharacterId(leftIndex)]: "left",
      [getCharacterId(activeIndex)]: "active",
      [getCharacterId(rightIndex)]: "right",
   } as Record<CharacterId, DesktopSlot>;
}

function getDesktopCharacterElements(stageRefs: CharacterStageRefs) {
   return Object.entries(stageRefs.desktopCharacterRefs)
      .map(([id, ref]) => ({
         id: id as CharacterId,
         element: ref.current,
      }))
      .filter((item): item is { id: CharacterId; element: HTMLDivElement } => Boolean(item.element));
}

function getCharacterLayers(element: HTMLDivElement) {
   return {
      sideLayer: element.querySelector<HTMLElement>("[data-side-layer]"),
      sideVisual: element.querySelector<HTMLElement>("[data-side-visual]"),
      activeLayer: element.querySelector<HTMLElement>("[data-active-layer]"),
   };
}

function startCharacterIdle(characterElement: HTMLElement) {
   gsap.killTweensOf(characterElement);

   gsap.set(characterElement, {
      y: 0,
      transformOrigin: "50% 85%",
   });

   return gsap.to(characterElement, {
      y: -4,
      duration: 2.6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
   });
}

function setDesktopComposition(stageRefs: CharacterStageRefs, activeIndex: number) {
   const slots = getDesktopSlots(activeIndex);
   const desktopCharacters = getDesktopCharacterElements(stageRefs);

   desktopCharacters.forEach(({ id, element }) => {
      const slot = slots[id];
      const { sideLayer, sideVisual, activeLayer } = getCharacterLayers(element);

      if (sideLayer) {
         gsap.killTweensOf(sideLayer);

         gsap.set(sideLayer, {
            opacity: slot === "active" ? 0 : 1,
            y: 0,
            scale: 1,
            pointerEvents: slot === "active" ? "none" : "auto",
         });
      }

      if (sideVisual) {
         gsap.killTweensOf(sideVisual);

         gsap.set(sideVisual, {
            opacity: 1,
            scale: 1,
         });
      }

      if (activeLayer) {
         gsap.killTweensOf(activeLayer);

         gsap.set(activeLayer, {
            opacity: slot === "active" ? 1 : 0,
            y: 0,
            scale: 1,
         });
      }

      gsap.set(element, {
         zIndex: slot === "active" ? 10 : 1,
      });
   });
}

export function useCharacterEntrance(stageRefs: CharacterStageRefs, infoRefs: CharacterInfoRefs) {
   useEffect(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isDesktop = window.matchMedia(DESKTOP_MEDIA_QUERY).matches;

      const nameElement = infoRefs.nameRef.current;
      const metaElement = infoRefs.metaRef.current;
      const descriptionElement = infoRefs.descriptionRef.current;

      if (!nameElement || !metaElement || !descriptionElement) return;

      const characterElements = isDesktop ? getDesktopCharacterElements(stageRefs).map(({ element }) => element) : stageRefs.mobileCharacterRef.current ? [stageRefs.mobileCharacterRef.current] : [];

      if (!characterElements.length) return;

      if (reduceMotion) {
         gsap.set([...characterElements, nameElement, metaElement, descriptionElement], {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
         });

         return;
      }

      const timeline = gsap.timeline({
         delay: 0.15,
      });

      timeline.fromTo(
         characterElements,
         {
            opacity: 0,
            y: 14,
         },
         {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: isDesktop ? 0.08 : 0,
            ease: "power3.out",
         },
         0,
      );

      timeline.fromTo(
         nameElement,
         {
            opacity: 0,
            y: 10,
            filter: "blur(4px)",
         },
         {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "power3.out",
         },
         0.2,
      );

      timeline.fromTo(
         metaElement,
         {
            opacity: 0,
            y: 8,
            filter: "blur(3px)",
         },
         {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
         },
         0.27,
      );

      timeline.fromTo(
         descriptionElement,
         {
            opacity: 0,
            y: 6,
            filter: "blur(3px)",
         },
         {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "power3.out",
         },
         0.34,
      );

      return () => {
         timeline.kill();

         gsap.set([...characterElements, nameElement, metaElement, descriptionElement], {
            clearProps: "opacity,transform,filter",
         });
      };
   }, [stageRefs, infoRefs]);
}

export function useCharacterIdle(stageRefs: CharacterStageRefs, activeIndex: number, isTransitioning: boolean) {
   useEffect(() => {
      if (isTransitioning) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (reduceMotion.matches) return;

      const isDesktop = window.matchMedia(DESKTOP_MEDIA_QUERY).matches;

      if (isDesktop) {
         const characterElement = stageRefs.desktopCharacterRefs[getCharacterId(activeIndex)].current;

         if (!characterElement) return;

         const activeLayer = characterElement.querySelector<HTMLElement>("[data-active-layer]");

         if (!activeLayer) return;

         const idleTween = startCharacterIdle(activeLayer);

         return () => {
            idleTween.kill();

            gsap.set(activeLayer, {
               y: 0,
            });
         };
      }

      const mobileCharacterElement = stageRefs.mobileCharacterRef.current;

      if (!mobileCharacterElement) return;

      const idleTween = startCharacterIdle(mobileCharacterElement);

      return () => {
         idleTween.kill();

         gsap.set(mobileCharacterElement, {
            y: 0,
         });
      };
   }, [activeIndex, isTransitioning, stageRefs]);
}

export function useCharacterNavigation(stageRefs: CharacterStageRefs, backgroundsRef: RefObject<HTMLDivElement | null>, infoRefs: CharacterInfoRefs) {
   const [activeIndex, setActiveIndex] = useState(0);
   const [isTransitioning, setIsTransitioning] = useState(false);

   const activeIndexRef = useRef(0);
   const transitionLockRef = useRef(false);

   const character = characters[activeIndex];

   useEffect(() => {
      activeIndexRef.current = activeIndex;
   }, [activeIndex]);

   useEffect(() => {
      const updateComposition = () => {
         const isDesktop = window.matchMedia(DESKTOP_MEDIA_QUERY).matches;

         if (isDesktop) {
            setDesktopComposition(stageRefs, activeIndexRef.current);
         }
      };

      updateComposition();

      window.addEventListener("resize", updateComposition);

      return () => {
         window.removeEventListener("resize", updateComposition);
      };
   }, [stageRefs]);

   const changeCharacter = useCallback(
      (nextIndex: number) => {
         const currentIndex = activeIndexRef.current;

         if (transitionLockRef.current || nextIndex === currentIndex) return;

         const backgroundsElement = backgroundsRef.current;
         const nameElement = infoRefs.nameRef.current;
         const metaElement = infoRefs.metaRef.current;
         const descriptionElement = infoRefs.descriptionRef.current;

         if (!backgroundsElement || !nameElement || !metaElement || !descriptionElement) return;

         const currentBackground = backgroundsElement.querySelector<HTMLElement>(`[data-background-index="${currentIndex}"]`);
         const nextBackground = backgroundsElement.querySelector<HTMLElement>(`[data-background-index="${nextIndex}"]`);

         if (!currentBackground || !nextBackground) return;

         const isDesktop = window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
         const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

         transitionLockRef.current = true;
         setIsTransitioning(true);

         if (reduceMotion) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);

            const backgrounds = backgroundsElement.querySelectorAll<HTMLElement>("[data-background-index]");

            backgrounds.forEach((background, index) => {
               gsap.set(background, {
                  opacity: index === nextIndex ? 1 : 0,
                  zIndex: 0,
               });
            });

            gsap.set([nameElement, metaElement, descriptionElement], {
               opacity: 1,
               y: 0,
               filter: "blur(0px)",
            });

            if (isDesktop) {
               setDesktopComposition(stageRefs, nextIndex);
            }

            transitionLockRef.current = false;
            setIsTransitioning(false);

            return;
         }

         gsap.killTweensOf([currentBackground, nextBackground]);
         gsap.killTweensOf([nameElement, metaElement, descriptionElement]);

         gsap.set(currentBackground, {
            opacity: 1,
            zIndex: 0,
         });

         gsap.set(nextBackground, {
            opacity: 0,
            zIndex: 1,
         });

         const timeline = gsap.timeline({
            defaults: {
               overwrite: "auto",
            },
            onComplete: () => {
               gsap.set(currentBackground, {
                  opacity: 0,
                  zIndex: 0,
               });

               gsap.set(nextBackground, {
                  opacity: 1,
                  zIndex: 0,
               });

               gsap.set([nameElement, metaElement, descriptionElement], {
                  clearProps: "transform,opacity,filter",
               });

               if (isDesktop) {
                  setDesktopComposition(stageRefs, nextIndex);
               } else {
                  const mobileCharacterElement = stageRefs.mobileCharacterRef.current;

                  if (mobileCharacterElement) {
                     gsap.set(mobileCharacterElement, {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                     });
                  }
               }

               transitionLockRef.current = false;
               setIsTransitioning(false);
            },
         });

         /* BACKGROUND */
         timeline.to(
            currentBackground,
            {
               opacity: 0,
               duration: 0.85,
               ease: "power2.inOut",
            },
            0,
         );

         timeline.to(
            nextBackground,
            {
               opacity: 1,
               duration: 0.85,
               ease: "power2.inOut",
            },
            0,
         );

         /* INFO OUT */
         timeline.to(
            nameElement,
            {
               y: -6,
               opacity: 0,
               filter: "blur(4px)",
               duration: 0.22,
               ease: "power2.in",
            },
            0,
         );

         timeline.to(
            metaElement,
            {
               y: -5,
               opacity: 0,
               filter: "blur(3px)",
               duration: 0.2,
               ease: "power2.in",
            },
            0.025,
         );

         timeline.to(
            descriptionElement,
            {
               y: -4,
               opacity: 0,
               filter: "blur(3px)",
               duration: 0.2,
               ease: "power2.in",
            },
            0.05,
         );

         /* SWAP DESKTOP CONTENT WHILE INFO IS INVISIBLE */
         if (isDesktop) {
            timeline.call(
               () => {
                  activeIndexRef.current = nextIndex;
                  setActiveIndex(nextIndex);
               },
               [],
               0.26,
            );
         }

         /* LAPTOP + DESKTOP */
         if (isDesktop) {
            const oldSlots = getDesktopSlots(currentIndex);
            const newSlots = getDesktopSlots(nextIndex);
            const desktopCharacters = getDesktopCharacterElements(stageRefs);

            desktopCharacters.forEach(({ id, element }) => {
               const oldSlot = oldSlots[id];
               const newSlot = newSlots[id];

               const { sideLayer, sideVisual, activeLayer } = getCharacterLayers(element);

               if (sideLayer) {
                  gsap.killTweensOf(sideLayer);
               }

               if (sideVisual) {
                  gsap.killTweensOf(sideVisual);
               }

               if (activeLayer) {
                  gsap.killTweensOf(activeLayer);

                  gsap.set(activeLayer, {
                     y: 0,
                  });
               }

               /* SUPPORT -> ACTIVE */
               if (oldSlot !== "active" && newSlot === "active") {
                  gsap.set(element, {
                     zIndex: 10,
                  });

                  if (sideLayer) {
                     timeline.set(
                        sideLayer,
                        {
                           pointerEvents: "none",
                        },
                        0,
                     );

                     timeline.to(
                        sideLayer,
                        {
                           opacity: 0,
                           duration: 0.42,
                           ease: "power2.inOut",
                        },
                        0,
                     );
                  }

                  if (sideVisual) {
                     timeline.to(
                        sideVisual,
                        {
                           opacity: 0.88,
                           duration: 0.32,
                           ease: "sine.inOut",
                        },
                        0,
                     );
                  }

                  if (activeLayer) {
                     timeline.fromTo(
                        activeLayer,
                        {
                           opacity: 0,
                           y: 7,
                           scale: 0.985,
                        },
                        {
                           opacity: 1,
                           y: 0,
                           scale: 1,
                           duration: 0.62,
                           ease: "power3.out",
                        },
                        0.12,
                     );
                  }

                  return;
               }

               /* ACTIVE -> SUPPORT */
               if (oldSlot === "active" && newSlot !== "active") {
                  if (activeLayer) {
                     timeline.to(
                        activeLayer,
                        {
                           opacity: 0,
                           y: 3,
                           scale: 0.99,
                           duration: 0.38,
                           ease: "power2.inOut",
                        },
                        0,
                     );
                  }

                  if (sideLayer) {
                     timeline.set(
                        sideLayer,
                        {
                           opacity: 0,
                           y: 0,
                           scale: 1,
                           pointerEvents: "none",
                        },
                        0,
                     );

                     timeline.to(
                        sideLayer,
                        {
                           opacity: 1,
                           duration: 0.55,
                           ease: "power2.out",
                        },
                        0.18,
                     );

                     timeline.set(
                        sideLayer,
                        {
                           pointerEvents: "auto",
                        },
                        0.76,
                     );
                  }

                  if (sideVisual) {
                     timeline.fromTo(
                        sideVisual,
                        {
                           opacity: 0.82,
                        },
                        {
                           opacity: 1,
                           duration: 0.48,
                           ease: "sine.inOut",
                        },
                        0.18,
                     );
                  }

                  timeline.set(
                     element,
                     {
                        zIndex: 1,
                     },
                     0.4,
                  );

                  return;
               }

               /* SUPPORT -> OPPOSITE SUPPORT */
               if (oldSlot !== "active" && newSlot !== "active" && oldSlot !== newSlot && sideLayer) {
                  timeline.to(
                     sideLayer,
                     {
                        opacity: 0.72,
                        duration: 0.22,
                        ease: "power2.inOut",
                     },
                     0,
                  );

                  timeline.to(
                     sideLayer,
                     {
                        opacity: 1,
                        duration: 0.42,
                        ease: "power2.out",
                     },
                     0.24,
                  );
               }
            });
         } else {
            /* MOBILE + SMALL TABLET */
            const mobileCharacterElement = stageRefs.mobileCharacterRef.current;
            const direction = nextIndex > currentIndex ? 1 : -1;

            if (mobileCharacterElement) {
               gsap.killTweensOf(mobileCharacterElement);

               /* OLD CHARACTER OUT */
               timeline.to(
                  mobileCharacterElement,
                  {
                     x: direction * -18,
                     y: 4,
                     opacity: 0,
                     scale: 0.99,
                     duration: 0.3,
                     ease: "power2.inOut",
                  },
                  0,
               );

               /* SWAP CHARACTER WHILE INVISIBLE */
               timeline.call(
                  () => {
                     activeIndexRef.current = nextIndex;
                     setActiveIndex(nextIndex);
                  },
                  [],
                  0.3,
               );

               /* PREPARE NEW CHARACTER */
               timeline.set(
                  mobileCharacterElement,
                  {
                     x: direction * 22,
                     y: 4,
                     opacity: 0,
                     scale: 0.99,
                  },
                  0.32,
               );

               /* NEW CHARACTER IN */
               timeline.to(
                  mobileCharacterElement,
                  {
                     x: 0,
                     y: 0,
                     opacity: 1,
                     scale: 1,
                     duration: 0.52,
                     ease: "power3.out",
                  },
                  0.36,
               );
            } else {
               timeline.call(
                  () => {
                     activeIndexRef.current = nextIndex;
                     setActiveIndex(nextIndex);
                  },
                  [],
                  0.3,
               );
            }
         }

         /* INFO PREPARE */
         timeline.set(
            nameElement,
            {
               y: 10,
               opacity: 0,
               filter: "blur(4px)",
            },
            0.28,
         );

         timeline.set(
            metaElement,
            {
               y: 8,
               opacity: 0,
               filter: "blur(3px)",
            },
            0.28,
         );

         timeline.set(
            descriptionElement,
            {
               y: 6,
               opacity: 0,
               filter: "blur(3px)",
            },
            0.28,
         );

         /* INFO IN */
         timeline.to(
            nameElement,
            {
               y: 0,
               opacity: 1,
               filter: "blur(0px)",
               duration: 0.5,
               ease: "power3.out",
            },
            0.36,
         );

         timeline.to(
            metaElement,
            {
               y: 0,
               opacity: 1,
               filter: "blur(0px)",
               duration: 0.46,
               ease: "power3.out",
            },
            0.41,
         );

         timeline.to(
            descriptionElement,
            {
               y: 0,
               opacity: 1,
               filter: "blur(0px)",
               duration: 0.5,
               ease: "power3.out",
            },
            0.46,
         );
      },
      [backgroundsRef, infoRefs, stageRefs],
   );

   const previousCharacter = () => {
      const previousIndex = (activeIndexRef.current - 1 + characters.length) % characters.length;
      changeCharacter(previousIndex);
   };

   const nextCharacter = () => {
      const nextIndex = (activeIndexRef.current + 1) % characters.length;
      changeCharacter(nextIndex);
   };

   const selectCharacter = (index: number) => {
      changeCharacter(index);
   };

   return {
      activeIndex,
      character,
      isTransitioning,
      previousCharacter,
      nextCharacter,
      selectCharacter,
   };
}
