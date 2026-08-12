# Real screenshots and photos

Drop image files here, then point a project visual at one:

```ts
// src/content/projects/cemetric.ts
cover: {
  kind: 'feed',                              // ignored once `image` is set
  frame: 'desktop',                          // still controls the device frame
  image: '/work/cemetric-discovery.webp',    // ← your file
  alt: 'Cemetric discovery page: filter rail on the left, athlete cards in a grid.',
}
```

The image renders inside the same frame, cropped to the frame's proportions,
lazily loaded and decoded off the main thread. Remove the `image` line to go
back to the drawn mockup.

Recommended: `.webp` or `.avif`, roughly 2× the display size —
desktop frames are 1240×776, mobile 380×762, bare 1040×505.
