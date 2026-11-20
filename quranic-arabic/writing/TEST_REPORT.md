# Test Report

## Static checks

- [x] Inline JavaScript parsed successfully with `node --check`.
- [x] Exactly 28 primary Arabic letters are present.
- [x] Exactly 135 Quranic word records are present.
- [x] All 135 Arabic word strings are unique.
- [x] All 135 word entries pass Arabic letter/harakat cluster round-trip checks.
- [x] Word distribution: 35 easy, 44 medium, 56 challenge.
- [x] 9 harakat/reading marks are present.
- [x] 8 additional/special Arabic forms are listed.
- [x] Primary alphabet joining groups: 22 dual-joining and 6 right-joining letters.
- [x] Original uploaded HTML is preserved as `original-source.html`.

## Functional design checks

- [x] Main navigation includes Home, Letters, Forms, Joining, Harakat, Words and Review.
- [x] Virtual keyboard builds Arabic character rows and a harakat row.
- [x] Typed word validation compares letter clusters and harakat.
- [x] Handwriting canvas supports pointer input, trace guide, free-write, undo and clear.
- [x] Progress is stored in browser localStorage.
- [x] Layout includes mobile breakpoints and light/dark theme.

## Known limitation

- Automatic handwriting recognition is not included. The handwriting mode is a guided writing canvas and relies on the learner to compare their writing with the sample.
- A full browser-driven end-to-end test could not be completed in this build environment. JavaScript syntax and content counts were checked independently.
