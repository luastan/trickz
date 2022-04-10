<template>
  <div class="flex items-center overflow-hidden justify-center bg-gray-900 dark:bg-neutral-900">

    <div class="stack w-full" style="--stacks: 3;">
<!--      <span class="layer" style="&#45;&#45;index: 0;">TRICKZ</span>-->
<!--      <span class="layer" style="&#45;&#45;index: 1;">TRICKZ</span>-->
<!--      <span class="layer" style="&#45;&#45;index: 2;">TRICKZ</span>-->

<!--      <tricks-animated-logo class="layer w-full text-white" style="&#45;&#45;index: 0;"/>-->
<!--      <tricks-animated-logo class="layer w-full text-white" style="&#45;&#45;index: 1;"/>-->
<!--      <tricks-animated-logo class="layer w-full text-white" style="&#45;&#45;index: 2;"/>-->
      <icons-trickz-padded class="layer w-full text-white" style="--index: 0;"/>
      <icons-trickz-padded class="layer w-full text-white" style="--index: 1;"/>
      <icons-trickz-padded class="layer w-full text-white" style="--index: 2;"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimatedLogoGlitch"
}
</script>

<style>



.stack {
  display: grid;
  grid-template-columns: 1fr;
}

.stack .layer {
  grid-row-start: 1;
  grid-column-start: 1;
  font-size: 4rem;
  --stack-height: calc(100% / var(--stacks) - 1px);
  --inverse-index: calc(calc(var(--stacks) - 1) - var(--index));
  --clip-top: calc(var(--stack-height) * var(--index));
  --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
  clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
  animation: stack 370ms cubic-bezier(.46, .29, 0, 1.24) 1 backwards calc(var(--index) * 120ms), glitch 2s ease infinite 2s alternate-reverse;
}

.stack .layer:nth-child(odd) {
  --glitch-translate: 5%;
}

.stack .layer:nth-child(even) {
  --glitch-translate: -10%;
}

@keyframes stack {
  0% {
    opacity: 0;
    transform: translateX(-100%);
    filter: drop-shadow(-8px 12px 0 red) drop-shadow(8px -12px 0 blue);
  }
  60% {
    opacity: 0.5;
    transform: translateX(50%);
  }
  80% {
    transform: none;
    opacity: 1;
    filter: drop-shadow(8px -12px 0 red) drop-shadow(-8px 12px 0 blue);
  }
  100% {
    filter: none;
  }
}

@keyframes glitch {
  0% {
    filter: drop-shadow(-12px 18px 0 red) drop-shadow(12px -18px 0 blue);
    transform: translate(var(--glitch-translate));
  }
  2% {
    filter: drop-shadow(12px -18px 0 red) drop-shadow(-12px 18px 0 blue);
  }
  4%, 100% {
    filter: none;
    transform: none;
  }
}
</style>
