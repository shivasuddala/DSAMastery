// Step-by-step animations for selected problems.
// Keyed by `topicId/itemId`. Types: 'array' | 'list' | 'grid' | 'tree'
// Frame states: active (amber), window (blue), found (green), swap (purple),
// done (dim green), removed (red).

const v = {}

/* ---------------- Arrays ---------------- */

v['arrays/two-sum'] = {
  type: 'array',
  frames: [
    { note: 'target = 9. Walk left → right, remembering every value in a hash map ("seen").',
      values: [2, 7, 11, 15], pointers: [{ index: 0, label: 'i' }], chips: [{ label: 'seen', value: '{}' }] },
    { note: 'i = 0 → nums[0] = 2. We need 9 − 2 = 7. Is 7 in seen? Not yet.',
      values: [2, 7, 11, 15], states: { 0: 'active' }, pointers: [{ index: 0, label: 'i' }], chips: [{ label: 'seen', value: '{}' }] },
    { note: 'Not found → store 2 → seen = {2: 0}. Move on.',
      values: [2, 7, 11, 15], states: { 0: 'done' }, pointers: [{ index: 1, label: 'i' }], chips: [{ label: 'seen', value: '{2: 0}' }] },
    { note: 'i = 1 → nums[1] = 7. We need 9 − 7 = 2 — and 2 IS in seen at index 0! 🎉',
      values: [2, 7, 11, 15], states: { 0: 'found', 1: 'active' }, pointers: [{ index: 1, label: 'i' }], chips: [{ label: 'seen', value: '{2: 0}' }] },
    { note: 'Answer: [0, 1] — the indices of 2 and 7, which add up to 9. ✅',
      values: [2, 7, 11, 15], states: { 0: 'found', 1: 'found' }, chips: [{ label: 'answer', value: '[0, 1]' }] },
  ],
}

v['arrays/kadanes'] = {
  type: 'array',
  frames: [
    { note: 'Start: cur = best = −2 (first element). cur = best sum ENDING here; best = best sum anywhere.',
      values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], states: { 0: 'active' },
      chips: [{ label: 'cur', value: '-2' }, { label: 'best', value: '-2' }] },
    { note: 'nums[1] = 1: cur = max(1, −2+1=−1) = 1 → start a new subarray at 1. best = max(−2, 1) = 1.',
      values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], states: { 0: 'removed', 1: 'active' },
      chips: [{ label: 'cur', value: '1' }, { label: 'best', value: '1' }] },
    { note: 'nums[2] = −3: cur = max(−3, 1−3=−2) = −2 → keep extending [1, −3]. best stays 1.',
      values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], states: { 0: 'removed', 1: 'window', 2: 'active' },
      chips: [{ label: 'cur', value: '-2' }, { label: 'best', value: '1' }] },
    { note: 'nums[3] = 4: cur = max(4, −2+4=2) = 4 → drop the negative prefix, restart at 4. best = 4.',
      values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], states: { 0: 'removed', 1: 'removed', 2: 'removed', 3: 'active' },
      chips: [{ label: 'cur', value: '4' }, { label: 'best', value: '4' }] },
    { note: 'nums[4] = −1: cur = max(−1, 4−1=3) = 3 → still worth extending. best = 4.',
      values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], states: { 3: 'window', 4: 'active', 0: 'removed', 1: 'removed', 2: 'removed' },
      chips: [{ label: 'cur', value: '3' }, { label: 'best', value: '4' }] },
    { note: 'nums[5] = 2: cur = max(2, 3+2=5) = 5. best = 5.',
      values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], states: { 3: 'window', 4: 'window', 5: 'active', 0: 'removed', 1: 'removed', 2: 'removed' },
      chips: [{ label: 'cur', value: '5' }, { label: 'best', value: '5' }] },
    { note: 'nums[6] = 1: cur = max(1, 5+1=6) = 6. best = 6.',
      values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], states: { 3: 'window', 4: 'window', 5: 'window', 6: 'active', 0: 'removed', 1: 'removed', 2: 'removed' },
      chips: [{ label: 'cur', value: '6' }, { label: 'best', value: '6' }] },
    { note: 'nums[7] = −5: cur = max(−5, 6−5=1) = 1. best stays 6.',
      values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], states: { 3: 'window', 4: 'window', 5: 'window', 6: 'window', 7: 'active', 0: 'removed', 1: 'removed', 2: 'removed' },
      chips: [{ label: 'cur', value: '1' }, { label: 'best', value: '6' }] },
    { note: 'nums[8] = 4: cur = max(4, 1+4=5) = 5. best stays 6.',
      values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], states: { 3: 'window', 4: 'window', 5: 'window', 6: 'window', 7: 'window', 8: 'active', 0: 'removed', 1: 'removed', 2: 'removed' },
      chips: [{ label: 'cur', value: '5' }, { label: 'best', value: '6' }] },
    { note: 'Best subarray = [4, −1, 2, 1] with sum 6 ✅ (green = the winner)',
      values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], states: { 3: 'found', 4: 'found', 5: 'found', 6: 'found', 0: 'removed', 1: 'removed', 2: 'removed', 7: 'removed', 8: 'removed' },
      chips: [{ label: 'answer', value: '6' }] },
  ],
}

v['arrays/rotate-array'] = {
  type: 'array',
  frames: [
    { note: 'Rotate [1,2,3,4,5,6,7] right by k = 3 — using three reversals, O(1) extra space.',
      values: [1, 2, 3, 4, 5, 6, 7] },
    { note: 'Step 1 — reverse the WHOLE array.',
      values: [7, 6, 5, 4, 3, 2, 1], states: { 0: 'swap', 1: 'swap', 2: 'swap', 3: 'swap', 4: 'swap', 5: 'swap', 6: 'swap' } },
    { note: 'Step 2 — reverse the first k = 3 elements (7,6,5 → 5,6,7).',
      values: [5, 6, 7, 4, 3, 2, 1], states: { 0: 'swap', 1: 'swap', 2: 'swap' } },
    { note: 'Step 3 — reverse the rest (indices 3..6): 4,3,2,1 → 1,2,3,4.',
      values: [5, 6, 7, 1, 2, 3, 4], states: { 3: 'swap', 4: 'swap', 5: 'swap', 6: 'swap' } },
    { note: 'Done! Array rotated by 3 with zero extra memory ✅',
      values: [5, 6, 7, 1, 2, 3, 4], states: { 0: 'found', 1: 'found', 2: 'found', 3: 'found', 4: 'found', 5: 'found', 6: 'found' } },
  ],
}

/* ---------------- Strings ---------------- */

v['strings/longest-substring-no-repeat'] = {
  type: 'array',
  frames: [
    { note: 'Sliding window on s = "abca". Expand the right edge; shrink from the left on a duplicate.',
      values: ['a', 'b', 'c', 'a'] },
    { note: 'right = 0: add "a". Window = "a" (length 1).',
      values: ['a', 'b', 'c', 'a'], states: { 0: 'window' }, pointers: [{ index: 0, label: 'r' }], chips: [{ label: 'window', value: '"a"' }] },
    { note: 'right = 1: add "b" — not a duplicate. Window = "ab" (length 2).',
      values: ['a', 'b', 'c', 'a'], states: { 0: 'window', 1: 'window' }, pointers: [{ index: 1, label: 'r' }], chips: [{ label: 'window', value: '"ab"' }] },
    { note: 'right = 2: add "c". Window = "abc" (length 3) — best so far.',
      values: ['a', 'b', 'c', 'a'], states: { 0: 'window', 1: 'window', 2: 'window' }, pointers: [{ index: 2, label: 'r' }], chips: [{ label: 'window', value: '"abc"' }] },
    { note: 'right = 3: "a" is a DUPLICATE! Shrink from the left until the old "a" leaves.',
      values: ['a', 'b', 'c', 'a'], states: { 0: 'active', 1: 'window', 2: 'window', 3: 'window' }, pointers: [{ index: 0, label: 'l' }, { index: 3, label: 'r' }] },
    { note: 'Removed s[0] = "a". Now window = "bca" — all unique, length 3.',
      values: ['a', 'b', 'c', 'a'], states: { 0: 'removed', 1: 'window', 2: 'window', 3: 'window' }, pointers: [{ index: 1, label: 'l' }, { index: 3, label: 'r' }], chips: [{ label: 'window', value: '"bca"' }] },
    { note: 'Longest = 3 ("abc" or "bca") ✅ Each char enters and leaves once → O(n).',
      values: ['a', 'b', 'c', 'a'], states: { 0: 'removed', 1: 'found', 2: 'found', 3: 'found' }, chips: [{ label: 'answer', value: '3' }] },
  ],
}

/* ---------------- Linked Lists ---------------- */

v['linked-lists/reverse-linked-list'] = {
  type: 'list',
  frames: [
    { note: 'List: 1 → 2 → 3 → 4. Walk it once, flipping each next-pointer backwards. prev = ∅, head = 1.',
      nodes: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }], pointers: [{ index: 0, label: 'head' }], showNull: true },
    { note: 'Save next (2). Flip 1.next → ∅. Move prev to 1, head to 2. Green = reversed part.',
      nodes: [{ v: 1, state: 'done' }, { v: 2 }, { v: 3 }, { v: 4 }],
      pointers: [{ index: 0, label: 'prev' }, { index: 1, label: 'head' }], showNull: true },
    { note: 'Flip 2.next → 1. prev = 2, head = 3.',
      nodes: [{ v: 2, state: 'done' }, { v: 1, state: 'done' }, { v: 3 }, { v: 4 }],
      pointers: [{ index: 1, label: 'prev' }, { index: 2, label: 'head' }], showNull: true },
    { note: 'Flip 3.next → 2. prev = 3, head = 4.',
      nodes: [{ v: 3, state: 'done' }, { v: 2, state: 'done' }, { v: 1, state: 'done' }, { v: 4 }],
      pointers: [{ index: 2, label: 'prev' }, { index: 3, label: 'head' }], showNull: true },
    { note: 'Flip 4.next → 3. head moves to ∅ — loop ends.',
      nodes: [{ v: 4, state: 'done' }, { v: 3, state: 'done' }, { v: 2, state: 'done' }, { v: 1, state: 'done' }],
      pointers: [{ index: 3, label: 'prev' }], showNull: true },
    { note: 'Return prev = node 4. Fully reversed: 4 → 3 → 2 → 1 ✅',
      nodes: [{ v: 4, state: 'found' }, { v: 3, state: 'found' }, { v: 2, state: 'found' }, { v: 1, state: 'found' }],
      pointers: [{ index: 0, label: 'head' }], showNull: true },
  ],
}

v['linked-lists/detect-cycle'] = {
  type: 'list',
  frames: [
    { note: 'List 1→2→3→4→5, and 5 points back to 3. slow moves 1 step, fast moves 2.',
      nodes: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5 }],
      pointers: [{ index: 0, label: 'slow' }, { index: 0, label: 'fast' }],
      chips: [{ label: 'cycle', value: '5 → 3' }] },
    { note: 'Step 1: slow → 2, fast → 3. No meeting yet.',
      nodes: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5 }],
      pointers: [{ index: 1, label: 'slow' }, { index: 2, label: 'fast' }] },
    { note: 'Step 2: slow → 3, fast → 5.',
      nodes: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5 }],
      pointers: [{ index: 2, label: 'slow' }, { index: 4, label: 'fast' }] },
    { note: 'Step 3: slow → 4, fast wraps around the cycle (5→3→4). They MEET at node 4 → a cycle exists! 🎯',
      nodes: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4, state: 'active' }, { v: 5 }],
      pointers: [{ index: 3, label: 'slow' }, { index: 3, label: 'fast' }] },
    { note: 'To find WHERE the cycle starts: reset slow to the head. Both now move 1 step at a time.',
      nodes: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4, state: 'active' }, { v: 5 }],
      pointers: [{ index: 0, label: 'slow' }, { index: 3, label: 'fast' }] },
    { note: 'slow → 2, fast → 5. Not equal yet.',
      nodes: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5 }],
      pointers: [{ index: 1, label: 'slow' }, { index: 4, label: 'fast' }] },
    { note: 'slow → 3, fast → 3. They meet exactly at the cycle start! ✅ (A neat math property — try proving it.)',
      nodes: [{ v: 1 }, { v: 2 }, { v: 3, state: 'found' }, { v: 4 }, { v: 5 }],
      pointers: [{ index: 2, label: 'slow' }, { index: 2, label: 'fast' }],
      chips: [{ label: 'cycle start', value: 'node 3' }] },
  ],
}

v['linked-lists/merge-two-lists'] = {
  type: 'list',
  frames: [
    { note: 'Merge a = 1→3→5 and b = 2→4→6. Compare the two fronts; the smaller joins the result.',
      nodes: [], chips: [{ label: 'a', value: '[1, 3, 5]' }, { label: 'b', value: '[2, 4, 6]' }] },
    { note: 'Compare 1 vs 2 → 1 is smaller. Take it.',
      nodes: [{ v: 1, state: 'done' }], chips: [{ label: 'a', value: '[3, 5]' }, { label: 'b', value: '[2, 4, 6]' }] },
    { note: 'Compare 3 vs 2 → 2 is smaller. Take it.',
      nodes: [{ v: 1, state: 'done' }, { v: 2, state: 'done' }], chips: [{ label: 'a', value: '[3, 5]' }, { label: 'b', value: '[4, 6]' }] },
    { note: 'Compare 3 vs 4 → take 3.',
      nodes: [{ v: 1, state: 'done' }, { v: 2, state: 'done' }, { v: 3, state: 'done' }], chips: [{ label: 'a', value: '[5]' }, { label: 'b', value: '[4, 6]' }] },
    { note: 'Compare 5 vs 4 → take 4.',
      nodes: [{ v: 1, state: 'done' }, { v: 2, state: 'done' }, { v: 3, state: 'done' }, { v: 4, state: 'done' }], chips: [{ label: 'a', value: '[5]' }, { label: 'b', value: '[6]' }] },
    { note: 'Compare 5 vs 6 → take 5. List a is now empty.',
      nodes: [{ v: 1, state: 'done' }, { v: 2, state: 'done' }, { v: 3, state: 'done' }, { v: 4, state: 'done' }, { v: 5, state: 'done' }],
      chips: [{ label: 'a', value: '[]' }, { label: 'b', value: '[6]' }] },
    { note: 'a is exhausted → attach the REST of b directly (no more comparisons needed).',
      nodes: [{ v: 1, state: 'done' }, { v: 2, state: 'done' }, { v: 3, state: 'done' }, { v: 4, state: 'done' }, { v: 5, state: 'done' }, { v: 6, state: 'found' }],
      chips: [{ label: 'a', value: '[]' }, { label: 'b', value: '[]' }] },
    { note: 'Merged: 1 → 2 → 3 → 4 → 5 → 6 ✅ Only one pass, O(n + m).',
      nodes: [{ v: 1, state: 'found' }, { v: 2, state: 'found' }, { v: 3, state: 'found' }, { v: 4, state: 'found' }, { v: 5, state: 'found' }, { v: 6, state: 'found' }] },
  ],
}

/* ---------------- Stacks & Queues ---------------- */

v['stacks-queues/valid-parentheses'] = {
  type: 'list',
  vertical: true,
  frames: [
    { note: 'Is s = "{[]}" valid? Push openers; every closer must match the stack top. Top of stack on top here.',
      nodes: [], pointers: [], chips: [{ label: 'next char', value: '{' }] },
    { note: '"{" is an opener → push. Stack: {',
      nodes: [{ v: '{' }], pointers: [{ index: 0, label: 'top' }], chips: [{ label: 'next char', value: '[' }] },
    { note: '"[" is an opener → push. Stack: [ {',
      nodes: [{ v: '[' }, { v: '{' }], pointers: [{ index: 0, label: 'top' }], chips: [{ label: 'next char', value: ']' }] },
    { note: '"]" is a closer → pop "[" and it MATCHES ✅',
      nodes: [{ v: '{', state: 'done' }], pointers: [{ index: 0, label: 'top' }], chips: [{ label: 'next char', value: '}' }] },
    { note: '"}" is a closer → pop "{" and it MATCHES ✅',
      nodes: [], chips: [{ label: 'stack', value: 'empty' }] },
    { note: 'Stack is empty and input is done → VALID ✅ (leftover items or a wrong match would mean invalid)',
      nodes: [], chips: [{ label: 'verdict', value: 'valid ✅' }] },
  ],
}

v['stacks-queues/next-greater-element'] = {
  type: 'array',
  frames: [
    { note: 'nums = [4, 5, 2, 15]. Keep a stack of "waiting" values (decreasing). Bigger values pop and answer them.',
      values: [4, 5, 2, 15], chips: [{ label: 'stack', value: '[]' }, { label: 'result', value: '[-, -, -, -]' }] },
    { note: 'i = 0: stack empty → push 4 and wait.',
      values: [4, 5, 2, 15], states: { 0: 'active' }, chips: [{ label: 'stack', value: '[4]' }, { label: 'result', value: '[-, -, -, -]' }] },
    { note: 'i = 1: 5 > 4 → pop 4, its next greater is 5! Push 5.',
      values: [4, 5, 2, 15], states: { 0: 'found', 1: 'active' }, chips: [{ label: 'stack', value: '[5]' }, { label: 'result', value: '[5, -, -, -]' }] },
    { note: 'i = 2: 2 < 5 → just push 2 and wait.',
      values: [4, 5, 2, 15], states: { 0: 'found', 1: 'window', 2: 'active' }, chips: [{ label: 'stack', value: '[5, 2]' }, { label: 'result', value: '[5, -, -, -]' }] },
    { note: 'i = 3: 15 > 2 → pop 2 (answer 15). 15 > 5 → pop 5 (answer 15). Push 15.',
      values: [4, 5, 2, 15], states: { 0: 'found', 1: 'found', 2: 'found', 3: 'active' }, chips: [{ label: 'stack', value: '[15]' }, { label: 'result', value: '[5, 15, 15, -]' }] },
    { note: 'End: anything still on the stack has no next greater → −1 ✅ Each element is pushed and popped once → O(n).',
      values: [4, 5, 2, 15], states: { 0: 'found', 1: 'found', 2: 'found', 3: 'removed' }, chips: [{ label: 'stack', value: '[15]' }, { label: 'result', value: '[5, 15, 15, -1] ✅' }] },
  ],
}

/* ---------------- Sorting / Searching ---------------- */

v['sorting/merge-sort'] = {
  type: 'array',
  frames: [
    { note: 'Merge sort [38, 27, 43, 10]: split in half, sort each half, merge. O(n log n) guaranteed.',
      values: [38, 27, 43, 10] },
    { note: 'Divide: left half [38, 27] and right half [43, 10] split into single elements.',
      values: [38, 27, 43, 10], states: { 0: 'active', 1: 'active', 2: 'active', 3: 'active' } },
    { note: 'Conquer left: merge [38] + [27] → compare → [27, 38].',
      values: [27, 38, 43, 10], states: { 0: 'done', 1: 'done' } },
    { note: 'Conquer right: merge [43] + [10] → [10, 43].',
      values: [27, 38, 10, 43], states: { 0: 'done', 1: 'done', 2: 'done', 3: 'done' } },
    { note: 'Combine: merge [27, 38] with [10, 43]. Compare fronts: 10 < 27 → take 10; then 27 < 43 → 27; then 38 < 43 → 38; leftover 43.',
      values: [27, 38, 10, 43], states: { 0: 'active', 1: 'active', 2: 'active', 3: 'active' } },
    { note: 'Final: [10, 27, 38, 43] ✅ log₂(n) levels × O(n) merge work each = O(n log n).',
      values: [10, 27, 38, 43], states: { 0: 'found', 1: 'found', 2: 'found', 3: 'found' } },
  ],
}

v['searching/classic-binary-search'] = {
  type: 'array',
  frames: [
    { note: 'Find 11 in [1, 3, 5, 7, 9, 11, 13]. Keep lo / hi; probe the middle and throw away half.',
      values: [1, 3, 5, 7, 9, 11, 13],
      pointers: [{ index: 0, label: 'lo' }, { index: 6, label: 'hi' }] },
    { note: 'mid = 3 → nums[3] = 7 < 11 → target must be on the RIGHT. Discard indices 0..3.',
      values: [1, 3, 5, 7, 9, 11, 13], states: { 0: 'removed', 1: 'removed', 2: 'removed', 3: 'removed', 4: 'window', 5: 'window', 6: 'window' },
      pointers: [{ index: 3, label: 'mid' }] },
    { note: 'lo = 4, hi = 6 → mid = 5 → nums[5] = 11 — FOUND! 🎯',
      values: [1, 3, 5, 7, 9, 11, 13], states: { 0: 'removed', 1: 'removed', 2: 'removed', 3: 'removed', 4: 'window', 5: 'found', 6: 'window' },
      pointers: [{ index: 4, label: 'lo' }, { index: 5, label: 'mid' }, { index: 6, label: 'hi' }] },
    { note: 'Found at index 5 after only 2 probes. 7 elements → ⌈log₂ 7⌉ = 3 probes max. That is O(log n) ✅',
      values: [1, 3, 5, 7, 9, 11, 13], states: { 5: 'found', 0: 'removed', 1: 'removed', 2: 'removed', 3: 'removed' },
      chips: [{ label: 'answer', value: 'index 5' }] },
  ],
}

/* ---------------- Graphs ---------------- */

v['graphs/dfs-islands'] = {
  type: 'grid',
  frames: [
    { note: 'Grid map: 1 = land, 0 = water. Scan every cell; each unvisited land cell starts a flood fill (DFS).',
      rows: [
        [{ v: 1 }, { v: 1 }, { v: 0 }],
        [{ v: 0 }, { v: 1 }, { v: 0 }],
        [{ v: 0 }, { v: 0 }, { v: 1 }],
      ] },
    { note: '(0,0) is land → island #1 begins. Sink it and DFS into its neighbors.',
      rows: [
        [{ v: 1, state: 'active' }, { v: 1 }, { v: 0 }],
        [{ v: 0 }, { v: 1 }, { v: 0 }],
        [{ v: 0 }, { v: 0 }, { v: 1 }],
      ], chips: [{ label: 'islands', value: '1' }] },
    { note: 'DFS visits right neighbor (0,1) — land → sink it, continue deeper.',
      rows: [
        [{ v: 0, state: 'done' }, { v: 1, state: 'active' }, { v: 0 }],
        [{ v: 0 }, { v: 1 }, { v: 0 }],
        [{ v: 0 }, { v: 0 }, { v: 1 }],
      ], chips: [{ label: 'islands', value: '1' }] },
    { note: 'From (0,1), down to (1,1) — land → sink it.',
      rows: [
        [{ v: 0, state: 'done' }, { v: 0, state: 'done' }, { v: 0 }],
        [{ v: 0 }, { v: 1, state: 'active' }, { v: 0 }],
        [{ v: 0 }, { v: 0 }, { v: 1 }],
      ], chips: [{ label: 'islands', value: '1' }] },
    { note: 'All neighbors of (1,1) are water or already sunk → island #1 complete. The DFS unwinds.',
      rows: [
        [{ v: 0, state: 'done' }, { v: 0, state: 'done' }, { v: 0 }],
        [{ v: 0 }, { v: 0, state: 'done' }, { v: 0 }],
        [{ v: 0 }, { v: 0 }, { v: 1 }],
      ], chips: [{ label: 'islands', value: '1' }] },
    { note: 'Keep scanning… (2,2) is land and unvisited → island #2! Sink it.',
      rows: [
        [{ v: 0, state: 'done' }, { v: 0, state: 'done' }, { v: 0 }],
        [{ v: 0 }, { v: 0, state: 'done' }, { v: 0 }],
        [{ v: 0 }, { v: 0 }, { v: 1, state: 'active' }],
      ], chips: [{ label: 'islands', value: '2' }] },
    { note: 'Scan finished. Every land cell was visited exactly once → Answer: 2 islands ✅ O(m·n).',
      rows: [
        [{ v: 0, state: 'done' }, { v: 0, state: 'done' }, { v: 0 }],
        [{ v: 0 }, { v: 0, state: 'done' }, { v: 0 }],
        [{ v: 0 }, { v: 0 }, { v: 0, state: 'done' }],
      ], chips: [{ label: 'answer', value: '2 ✅' }] },
  ],
}

v['graphs/bfs-shortest-path'] = {
  type: 'tree',
  frames: [
    { note: 'Shortest distances from A (unweighted graph). Start: dist(A) = 0, queue = [A].',
      nodes: [
        { id: 'A', label: 'A', x: 2, y: 0, state: 'window' },
        { id: 'B', label: 'B', x: 1, y: 1 }, { id: 'C', label: 'C', x: 3, y: 1 },
        { id: 'D', label: 'D', x: 2, y: 2 }, { id: 'E', label: 'E', x: 4, y: 2 },
        { id: 'F', label: 'F', x: 3, y: 3 },
      ],
      edges: [
        { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D' },
        { from: 'C', to: 'D' }, { from: 'C', to: 'E' }, { from: 'D', to: 'F' }, { from: 'E', to: 'F' },
      ],
      chips: [{ label: 'queue', value: '[A]' }, { label: 'dist', value: 'A:0' }] },
    { note: 'Dequeue A → visit its neighbors B and C, both at distance 1. Enqueue them.',
      nodes: [
        { id: 'A', label: 'A', x: 2, y: 0, state: 'done' },
        { id: 'B', label: 'B', x: 1, y: 1, state: 'window' }, { id: 'C', label: 'C', x: 3, y: 1, state: 'window' },
        { id: 'D', label: 'D', x: 2, y: 2 }, { id: 'E', label: 'E', x: 4, y: 2 },
        { id: 'F', label: 'F', x: 3, y: 3 },
      ],
      edges: [
        { from: 'A', to: 'B', state: 'active' }, { from: 'A', to: 'C', state: 'active' }, { from: 'B', to: 'D' },
        { from: 'C', to: 'D' }, { from: 'C', to: 'E' }, { from: 'D', to: 'F' }, { from: 'E', to: 'F' },
      ],
      chips: [{ label: 'queue', value: '[B, C]' }, { label: 'dist', value: 'A:0 B:1 C:1' }] },
    { note: 'Dequeue B → neighbor D gets dist 2.',
      nodes: [
        { id: 'A', label: 'A', x: 2, y: 0, state: 'done' },
        { id: 'B', label: 'B', x: 1, y: 1, state: 'done' }, { id: 'C', label: 'C', x: 3, y: 1, state: 'window' },
        { id: 'D', label: 'D', x: 2, y: 2, state: 'window' }, { id: 'E', label: 'E', x: 4, y: 2 },
        { id: 'F', label: 'F', x: 3, y: 3 },
      ],
      edges: [
        { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D', state: 'active' },
        { from: 'C', to: 'D' }, { from: 'C', to: 'E' }, { from: 'D', to: 'F' }, { from: 'E', to: 'F' },
      ],
      chips: [{ label: 'queue', value: '[C, D]' }, { label: 'dist', value: 'A:0 B:1 C:1 D:2' }] },
    { note: 'Dequeue C → E gets dist 2. (D already has a distance — first time wins, so skip it.)',
      nodes: [
        { id: 'A', label: 'A', x: 2, y: 0, state: 'done' },
        { id: 'B', label: 'B', x: 1, y: 1, state: 'done' }, { id: 'C', label: 'C', x: 3, y: 1, state: 'done' },
        { id: 'D', label: 'D', x: 2, y: 2, state: 'window' }, { id: 'E', label: 'E', x: 4, y: 2, state: 'window' },
        { id: 'F', label: 'F', x: 3, y: 3 },
      ],
      edges: [
        { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D' },
        { from: 'C', to: 'D' }, { from: 'C', to: 'E', state: 'active' }, { from: 'D', to: 'F' }, { from: 'E', to: 'F' },
      ],
      chips: [{ label: 'queue', value: '[D, E]' }, { label: 'dist', value: 'A:0 B:1 C:1 D:2 E:2' }] },
    { note: 'Dequeue D → F gets dist 3.',
      nodes: [
        { id: 'A', label: 'A', x: 2, y: 0, state: 'done' },
        { id: 'B', label: 'B', x: 1, y: 1, state: 'done' }, { id: 'C', label: 'C', x: 3, y: 1, state: 'done' },
        { id: 'D', label: 'D', x: 2, y: 2, state: 'done' }, { id: 'E', label: 'E', x: 4, y: 2, state: 'window' },
        { id: 'F', label: 'F', x: 3, y: 3, state: 'window' },
      ],
      edges: [
        { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D' },
        { from: 'C', to: 'D' }, { from: 'C', to: 'E' }, { from: 'D', to: 'F', state: 'active' }, { from: 'E', to: 'F' },
      ],
      chips: [{ label: 'queue', value: '[E, F]' }, { label: 'dist', value: '… D:2 E:2 F:3' }] },
    { note: 'Dequeue E → F already has dist 3; a longer path via E is ignored.',
      nodes: [
        { id: 'A', label: 'A', x: 2, y: 0, state: 'done' },
        { id: 'B', label: 'B', x: 1, y: 1, state: 'done' }, { id: 'C', label: 'C', x: 3, y: 1, state: 'done' },
        { id: 'D', label: 'D', x: 2, y: 2, state: 'done' }, { id: 'E', label: 'E', x: 4, y: 2, state: 'done' },
        { id: 'F', label: 'F', x: 3, y: 3, state: 'window' },
      ],
      edges: [
        { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D' },
        { from: 'C', to: 'D' }, { from: 'C', to: 'E' }, { from: 'D', to: 'F' }, { from: 'E', to: 'F' },
      ],
      chips: [{ label: 'queue', value: '[F]' }] },
    { note: 'Dequeue F → queue empty, done! Shortest dists: A:0 B:1 C:1 D:2 E:2 F:3 ✅ First time a node is reached in BFS = shortest distance.',
      nodes: [
        { id: 'A', label: 'A', x: 2, y: 0, state: 'done' },
        { id: 'B', label: 'B', x: 1, y: 1, state: 'found' }, { id: 'C', label: 'C', x: 3, y: 1, state: 'found' },
        { id: 'D', label: 'D', x: 2, y: 2, state: 'found' }, { id: 'E', label: 'E', x: 4, y: 2, state: 'found' },
        { id: 'F', label: 'F', x: 3, y: 3, state: 'found' },
      ],
      edges: [
        { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D' },
        { from: 'C', to: 'D' }, { from: 'C', to: 'E' }, { from: 'D', to: 'F' }, { from: 'E', to: 'F' },
      ],
      chips: [{ label: 'dist', value: 'A:0 B:1 C:1 D:2 E:2 F:3 ✅' }] },
  ],
}

/* ---------------- Trees ---------------- */

const TREE_NODES = [
  { id: 'n1', label: '1', x: 3, y: 0 },
  { id: 'n2', label: '2', x: 2, y: 1 },
  { id: 'n3', label: '3', x: 4, y: 1 },
  { id: 'n4', label: '4', x: 1, y: 2 },
  { id: 'n5', label: '5', x: 3, y: 2 },
  { id: 'n6', label: '6', x: 5, y: 2 },
]
const TREE_EDGES = [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' },
  { from: 'n2', to: 'n4' }, { from: 'n2', to: 'n5' }, { from: 'n3', to: 'n6' },
]
const tree = (states = {}) => ({
  nodes: TREE_NODES.map((n) => ({ ...n, state: states[n.id] || '' })),
  edges: TREE_EDGES,
})

v['trees/level-order'] = {
  type: 'tree',
  frames: [
    { note: 'Level-order (BFS) on this tree using a queue. Blue = waiting in queue, green = visited.',
      ...tree({ n1: 'window' }),
      chips: [{ label: 'queue', value: '[1]' }] },
    { note: 'Dequeue 1 → visit it. Enqueue its children 2 and 3.',
      ...tree({ n1: 'done', n2: 'window', n3: 'window' }),
      chips: [{ label: 'queue', value: '[2, 3]' }] },
    { note: 'Dequeue 2 → visit. Enqueue children 4 and 5.',
      ...tree({ n1: 'done', n2: 'done', n3: 'window', n4: 'window', n5: 'window' }),
      chips: [{ label: 'queue', value: '[3, 4, 5]' }] },
    { note: 'Dequeue 3 → visit. Enqueue child 6.',
      ...tree({ n1: 'done', n2: 'done', n3: 'done', n4: 'window', n5: 'window', n6: 'window' }),
      chips: [{ label: 'queue', value: '[4, 5, 6]' }] },
    { note: 'Dequeue 4 → visit. No children to enqueue.',
      ...tree({ n1: 'done', n2: 'done', n3: 'done', n4: 'done', n5: 'window', n6: 'window' }),
      chips: [{ label: 'queue', value: '[5, 6]' }] },
    { note: 'Dequeue 5 → visit.',
      ...tree({ n1: 'done', n2: 'done', n3: 'done', n4: 'done', n5: 'done', n6: 'window' }),
      chips: [{ label: 'queue', value: '[6]' }] },
    { note: 'Dequeue 6 → visit. Queue empty → done. Levels: [1], [2, 3], [4, 5, 6] ✅',
      ...tree({ n1: 'done', n2: 'done', n3: 'done', n4: 'found', n5: 'found', n6: 'found' }),
      chips: [{ label: 'levels', value: '[ [1], [2,3], [4,5,6] ] ✅' }] },
  ],
}

v['trees/tree-traversals'] = {
  type: 'tree',
  frames: [
    { note: 'INORDER (left → visit → right). Start at root 1, but go LEFT first.',
      ...tree({ n1: 'active' }), chips: [{ label: 'inorder', value: '[]' }] },
    { note: 'From 2, go left again → 4. 4 has no left child → VISIT 4.',
      ...tree({ n1: 'window', n2: 'window', n4: 'active' }), chips: [{ label: 'inorder', value: '[4]' }] },
    { note: 'Back at 2, its left is done → VISIT 2.',
      ...tree({ n1: 'window', n2: 'active', n4: 'done' }), chips: [{ label: 'inorder', value: '[4, 2]' }] },
    { note: 'Go right to 5 → visit 5 (no children).',
      ...tree({ n1: 'window', n2: 'done', n4: 'done', n5: 'active' }), chips: [{ label: 'inorder', value: '[4, 2, 5]' }] },
    { note: 'Back at root 1, left subtree finished → VISIT 1.',
      ...tree({ n1: 'active', n2: 'done', n4: 'done', n5: 'done' }), chips: [{ label: 'inorder', value: '[4, 2, 5, 1]' }] },
    { note: 'Right subtree: down to 3, left first → nothing? 3 has no left → VISIT 3, then right to 6 → VISIT 6.',
      ...tree({ n1: 'done', n2: 'done', n3: 'done', n4: 'done', n5: 'done', n6: 'active' }),
      chips: [{ label: 'inorder', value: '[4, 2, 5, 1, 3, 6]' }] },
    { note: 'Inorder = [4, 2, 5, 1, 3, 6]. On a BST this comes out SORTED ✅ (Preorder = visit-first: [1,2,4,5,3,6]; Postorder = visit-last: [4,5,2,6,3,1])',
      ...tree({ n4: 'found', n2: 'found', n5: 'found', n1: 'found', n3: 'found', n6: 'found' }),
      chips: [{ label: 'inorder', value: '[4, 2, 5, 1, 3, 6] ✅' }] },
  ],
}

/* ---------------- Dynamic Programming ---------------- */

v['dynamic-programming/climbing-stairs'] = {
  type: 'array',
  frames: [
    { note: 'How many ways to climb 5 stairs taking 1 or 2 steps? ways(n) = ways(n−1) + ways(n−2) — the last move was a single or double step.',
      values: [1, 1, '?', '?', '?', '?'], chips: [{ label: 'index =', value: 'ways(n)' }] },
    { note: 'Base cases: ways(0) = 1 (stay put), ways(1) = 1.',
      values: [1, 1, '?', '?', '?', '?'], states: { 0: 'done', 1: 'done' } },
    { note: 'ways(2) = ways(1) + ways(0) = 2 → [1+1] or [2].',
      values: [1, 1, 2, '?', '?', '?'], states: { 0: 'done', 1: 'done', 2: 'active' } },
    { note: 'ways(3) = ways(2) + ways(1) = 3.',
      values: [1, 1, 2, 3, '?', '?'], states: { 2: 'done', 3: 'active' } },
    { note: 'ways(4) = ways(3) + ways(2) = 5.',
      values: [1, 1, 2, 3, 5, '?'], states: { 3: 'done', 4: 'active' } },
    { note: 'ways(5) = ways(4) + ways(3) = 8 ✅ Each cell reuses the two before it — that is DP: no recomputation.',
      values: [1, 1, 2, 3, 5, 8], states: { 0: 'done', 1: 'done', 2: 'done', 3: 'done', 4: 'done', 5: 'found' },
      chips: [{ label: 'answer', value: '8 ✅' }] },
  ],
}

v['dynamic-programming/coin-change'] = {
  type: 'array',
  frames: [
    { note: 'Coins [1, 2, 5] — fewest coins to make 6? dp[x] = fewest coins for amount x. dp[0] = 0, rest start at ∞.',
      values: [0, '∞', '∞', '∞', '∞', '∞', '∞'], chips: [{ label: 'dp index', value: 'amount' }] },
    { note: 'dp[1]: try coin 1 → 1 + dp[0] = 1. (Coin 2 and 5 are too big.)',
      values: [0, 1, '∞', '∞', '∞', '∞', '∞'], states: { 1: 'active' } },
    { note: 'dp[2]: coin 1 → 1+dp[1] = 2; coin 2 → 1+dp[0] = 1 → min = 1.',
      values: [0, 1, 1, '∞', '∞', '∞', '∞'], states: { 1: 'done', 2: 'active' } },
    { note: 'dp[3]: coin 1 → 1+dp[2] = 2; coin 2 → 1+dp[1] = 2 → dp[3] = 2.',
      values: [0, 1, 1, 2, '∞', '∞', '∞'], states: { 2: 'done', 3: 'active' } },
    { note: 'dp[4]: coin 1 → 1+dp[3] = 3; coin 2 → 1+dp[2] = 2 → dp[4] = 2.',
      values: [0, 1, 1, 2, 2, '∞', '∞'], states: { 3: 'done', 4: 'active' } },
    { note: 'dp[5]: coin 1 → 3; coin 2 → 3; coin 5 → 1 + dp[0] = 1 → dp[5] = 1 🎯',
      values: [0, 1, 1, 2, 2, 1, '∞'], states: { 4: 'done', 5: 'active' } },
    { note: 'dp[6]: coin 1 → 1+dp[5] = 2; coin 2 → 1+dp[4] = 3; coin 5 → 1+dp[1] = 2 → dp[6] = 2 ✅ (5 + 1)',
      values: [0, 1, 1, 2, 2, 1, 2], states: { 5: 'done', 6: 'found' },
      chips: [{ label: 'answer', value: '2 coins (5+1) ✅' }] },
  ],
}

v['dynamic-programming/longest-common-subsequence'] = {
  type: 'grid',
  frames: [
    { note: 'LCS of a = "ace" and b = "abcde". dp[i][j] = LCS length of prefixes. Matching letters take the diagonal +1.',
      rows: [
        [{ v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }],
        [{ v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }],
        [{ v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }],
        [{ v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }],
      ],
      rowLabels: ['', 'a', 'c', 'e'], colLabels: ['', 'a', 'b', 'c', 'd', 'e'] },
    { note: 'Row "a": matches b\'s first letter → 1, then carries right → [1, 1, 1, 1, 1].',
      rows: [
        [{ v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }],
        [{ v: 0 }, { v: 1, state: 'active' }, { v: 1, state: 'active' }, { v: 1, state: 'active' }, { v: 1, state: 'active' }, { v: 1, state: 'active' }],
        [{ v: 0 }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }],
        [{ v: 0 }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }],
      ],
      rowLabels: ['', 'a', 'c', 'e'], colLabels: ['', 'a', 'b', 'c', 'd', 'e'] },
    { note: 'Row "c": no match vs a, b (carry max from above = 1)… then "c" == "c" → diagonal +1 = 2!',
      rows: [
        [{ v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }],
        [{ v: 0 }, { v: 1, state: 'done' }, { v: 1, state: 'done' }, { v: 1, state: 'done' }, { v: 1, state: 'done' }, { v: 1, state: 'done' }],
        [{ v: 0 }, { v: 1, state: 'active' }, { v: 1, state: 'active' }, { v: 2, state: 'active' }, { v: 2, state: 'active' }, { v: 2, state: 'active' }],
        [{ v: 0 }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }],
      ],
      rowLabels: ['', 'a', 'c', 'e'], colLabels: ['', 'a', 'b', 'c', 'd', 'e'] },
    { note: 'Row "e": carries 1, 1, 2, 2… then "e" == "e" at the last column → 2 + 1 = 3.',
      rows: [
        [{ v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }],
        [{ v: 0 }, { v: 1, state: 'done' }, { v: 1, state: 'done' }, { v: 1, state: 'done' }, { v: 1, state: 'done' }, { v: 1, state: 'done' }],
        [{ v: 0 }, { v: 1, state: 'done' }, { v: 1, state: 'done' }, { v: 2, state: 'done' }, { v: 2, state: 'done' }, { v: 2, state: 'done' }],
        [{ v: 0 }, { v: 1, state: 'active' }, { v: 1, state: 'active' }, { v: 2, state: 'active' }, { v: 2, state: 'active' }, { v: 3, state: 'found' }],
      ],
      rowLabels: ['', 'a', 'c', 'e'], colLabels: ['', 'a', 'b', 'c', 'd', 'e'] },
    { note: 'dp[3][5] = 3 → LCS = "ace" ✅ No match → max(top, left); match → diagonal + 1. O(m·n).',
      rows: [
        [{ v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }],
        [{ v: 0 }, { v: 1, state: 'done' }, { v: 1, state: 'done' }, { v: 1, state: 'done' }, { v: 1, state: 'done' }, { v: 1, state: 'done' }],
        [{ v: 0 }, { v: 1, state: 'done' }, { v: 1, state: 'done' }, { v: 2, state: 'done' }, { v: 2, state: 'done' }, { v: 2, state: 'done' }],
        [{ v: 0 }, { v: 1, state: 'done' }, { v: 1, state: 'done' }, { v: 2, state: 'done' }, { v: 2, state: 'done' }, { v: 3, state: 'found' }],
      ],
      rowLabels: ['', 'a', 'c', 'e'], colLabels: ['', 'a', 'b', 'c', 'd', 'e'],
      chips: [{ label: 'LCS', value: '"ace" (length 3) ✅' }] },
  ],
}

/* ---------------- Greedy ---------------- */

v['greedy/jump-game'] = {
  type: 'array',
  frames: [
    { note: 'Can we reach the end of [2, 3, 1, 1, 4]? Greedily track farthest — the farthest index reachable so far.',
      values: [2, 3, 1, 1, 4], chips: [{ label: 'farthest', value: '0' }] },
    { note: 'i = 0: jump 2 → farthest = 0 + 2 = 2. Indices 1..2 are now reachable (blue).',
      values: [2, 3, 1, 1, 4], states: { 0: 'active', 1: 'window', 2: 'window' }, chips: [{ label: 'farthest', value: '2' }] },
    { note: 'i = 1 (reachable ✅): jump 3 → farthest = max(2, 1+3) = 4.',
      values: [2, 3, 1, 1, 4], states: { 0: 'done', 1: 'active', 2: 'window', 3: 'window', 4: 'window' }, chips: [{ label: 'farthest', value: '4' }] },
    { note: 'i = 2 (reachable ✅): jump 1 → farthest stays 4.',
      values: [2, 3, 1, 1, 4], states: { 0: 'done', 1: 'done', 2: 'active', 3: 'window', 4: 'window' }, chips: [{ label: 'farthest', value: '4' }] },
    { note: 'i = 3 (reachable ✅): jump 1 → farthest stays 4.',
      values: [2, 3, 1, 1, 4], states: { 0: 'done', 1: 'done', 2: 'done', 3: 'active', 4: 'window' }, chips: [{ label: 'farthest', value: '4' }] },
    { note: 'i = 4 (reachable ✅) = last index → TRUE ✅ If an index ever passed farthest, we would be stuck and return false.',
      values: [2, 3, 1, 1, 4], states: { 0: 'done', 1: 'done', 2: 'done', 3: 'done', 4: 'found' },
      chips: [{ label: 'verdict', value: 'true ✅' }] },
  ],
}

export const visualizations = v
