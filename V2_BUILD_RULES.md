# Pawly V2 Build Rules

Pawly V2 is a clean rebuild.

Do not copy or adapt the Pawly V1 screen compositions.

The V1 project may only be inspected for:

- data models;
- Supabase integration;
- authentication logic;
- stores;
- localization;
- permissions;
- service logic.

All visual components and screens must be rebuilt from live Figma.

Implementation order:

1. initialise Expo and TypeScript;
2. establish tokens;
3. build audited Figma components;
4. build one reference screen;
5. compare against Figma;
6. obtain approval;
7. continue screen by screen;
8. integrate Supabase logic after visual foundations are stable.

Every reusable Figma component must map to a reusable React Native component.

Do not generate all screens in one pass until the visual workflow is proven.

Do not claim pixel accuracy without screenshot comparison.