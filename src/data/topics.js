// DSA Mastery — Topic data
// Each topic: id, title, icon, description, difficulty, items
// Each item: title, description, complexity { time, space }, tags, code { cpp, java, python, javascript }
// To extend: add new topics or items — the UI renders them automatically.

export const LANGUAGES = [
  { id: 'cpp', label: 'C++' },
  { id: 'java', label: 'Java' },
  { id: 'python', label: 'Python' },
  { id: 'javascript', label: 'JavaScript' },
]

export const topics = [
  {
    id: 'arrays',
    title: 'Arrays',
    icon: '📊',
    description: 'The foundation of everything. Contiguous memory, O(1) access, and the source of most interview problems.',
    items: [
      {
        id: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        tags: ['hash-map', 'hashing'],
        description: 'Given an array and a target, return indices of the two numbers that add up to the target. Classic hash-map one-pass solution.',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: {
          cpp: `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int need = target - nums[i];
        if (seen.count(need)) return {seen[need], i};
        seen[nums[i]] = i;
    }
    return {};
}`,
          java: `import java.util.HashMap;

public int[] twoSum(int[] nums, int target) {
    HashMap<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int need = target - nums[i];
        if (seen.containsKey(need)) {
            return new int[]{seen.get(need), i};
        }
        seen.put(nums[i], i);
    }
    return new int[]{};
}`,
          python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        need = target - num
        if need in seen:
            return [seen[need], i]
        seen[num] = i
    return []`,
          javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
        },
      },
      {
        id: 'kadanes',
        title: "Kadane's Algorithm — Maximum Subarray",
        difficulty: 'Medium',
        tags: ['sliding-window', 'dp'],
        description: 'Find the contiguous subarray with the largest sum. Track the best sum ending at each position; reset when running sum goes negative.',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: {
          cpp: `int maxSubArray(vector<int>& nums) {
    int best = nums[0], cur = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        cur = max(nums[i], cur + nums[i]);
        best = max(best, cur);
    }
    return best;
}`,
          java: `public int maxSubArray(int[] nums) {
    int best = nums[0], cur = nums[0];
    for (int i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], cur + nums[i]);
        best = Math.max(best, cur);
    }
    return best;
}`,
          python: `def max_sub_array(nums):
    best = cur = nums[0]
    for num in nums[1:]:
        cur = max(num, cur + num)
        best = max(best, cur)
    return best`,
          javascript: `function maxSubArray(nums) {
  let best = nums[0], cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}`,
        },
      },
      {
        id: 'rotate-array',
        title: 'Rotate Array (Reversal Trick)',
        difficulty: 'Medium',
        tags: ['two-pointers', 'in-place'],
        description: 'Rotate an array right by k positions in-place. Reverse the whole array, then reverse the first k and the rest. The classic O(1)-space trick.',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: {
          cpp: `void reverse(vector<int>& a, int l, int r) {
    while (l < r) swap(a[l++], a[r--]);
}
void rotate(vector<int>& nums, int k) {
    int n = nums.size();
    k %= n;
    reverse(nums, 0, n - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);
}`,
          java: `void reverse(int[] a, int l, int r) {
    while (l < r) { int t = a[l]; a[l++] = a[r]; a[r--] = t; }
}
public void rotate(int[] nums, int k) {
    int n = nums.length;
    k %= n;
    reverse(nums, 0, n - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);
}`,
          python: `def rotate(nums, k):
    n = len(nums)
    k %= n
    nums.reverse()
    nums[:k] = reversed(nums[:k])
    nums[k:] = reversed(nums[k:])`,
          javascript: `function rotate(nums, k) {
  const n = nums.length;
  k %= n;
  const reverse = (l, r) => {
    while (l < r) [nums[l++], nums[r--]] = [nums[r], nums[l]];
  };
  reverse(0, n - 1);
  reverse(0, k - 1);
  reverse(k, n - 1);
}`,
        },
      },
    ],
  },
  {
    id: 'strings',
    title: 'Strings',
    icon: '🔤',
    description: 'Immutable sequences, sliding windows, palindromes and anagram tricks.',
    items: [
      {
        id: 'valid-anagram',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        tags: ['counting', 'hash-map'],
        description: 'Check if two strings are anagrams by counting character frequencies in one pass.',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: {
          cpp: `bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    int count[26] = {0};
    for (char c : s) count[c - 'a']++;
    for (char c : t) if (--count[c - 'a'] < 0) return false;
    return true;
}`,
          java: `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (char c : s.toCharArray()) count[c - 'a']++;
    for (char c : t.toCharArray()) if (--count[c - 'a'] < 0) return false;
    return true;
}`,
          python: `from collections import Counter

def is_anagram(s, t):
    return Counter(s) == Counter(t)`,
          javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (const c of s) count[c.charCodeAt(0) - 97]++;
  for (const c of t) if (--count[c.charCodeAt(0) - 97] < 0) return false;
  return true;
}`,
        },
      },
      {
        id: 'longest-substring-no-repeat',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        tags: ['sliding-window', 'two-pointers'],
        description: 'The canonical sliding-window problem: expand the right edge, shrink from the left when a duplicate appears.',
        complexity: { time: 'O(n)', space: 'O(min(n, 26))' },
        code: {
          cpp: `int lengthOfLongestSubstring(string s) {
    unordered_set<char> window;
    int left = 0, best = 0;
    for (int right = 0; right < s.size(); right++) {
        while (window.count(s[right]))
            window.erase(s[left++]);
        window.insert(s[right]);
        best = max(best, right - left + 1);
    }
    return best;
}`,
          java: `public int lengthOfLongestSubstring(String s) {
    Set<Character> window = new HashSet<>();
    int left = 0, best = 0;
    for (int right = 0; right < s.length(); right++) {
        while (window.contains(s.charAt(right)))
            window.remove(s.charAt(left++));
        window.add(s.charAt(right));
        best = Math.max(best, right - left + 1);
    }
    return best;
}`,
          python: `def length_of_longest_substring(s):
    window = set()
    left = best = 0
    for right, ch in enumerate(s):
        while ch in window:
            window.remove(s[left])
            left += 1
        window.add(ch)
        best = max(best, right - left + 1)
    return best`,
          javascript: `function lengthOfLongestSubstring(s) {
  const window = new Set();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    while (window.has(s[right])) window.delete(s[left++]);
    window.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
        },
      },
      {
        id: 'longest-palindromic-substring',
        title: 'Longest Palindromic Substring (Expand Around Center)',
        difficulty: 'Medium',
        tags: ['two-pointers', 'palindrome'],
        description: 'Try every center (2n of them, handling odd/even lengths) and expand outwards while characters match.',
        complexity: { time: 'O(n²)', space: 'O(1)' },
        code: {
          cpp: `string longestPalindrome(string s) {
    int start = 0, len = 0;
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < s.size() && s[l] == s[r]) { l--; r++; }
        if (r - l - 1 > len) { start = l + 1; len = r - l - 1; }
    };
    for (int i = 0; i < s.size(); i++) {
        expand(i, i);       // odd length
        expand(i, i + 1);   // even length
    }
    return s.substr(start, len);
}`,
          java: `public String longestPalindrome(String s) {
    int[] best = {0, 0};
    for (int i = 0; i < s.length(); i++) {
        expand(s, i, i, best);
        expand(s, i, i + 1, best);
    }
    return s.substring(best[0], best[1]);
}
void expand(String s, int l, int r, int[] best) {
    while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
    if (r - l - 1 > best[1] - best[0]) { best[0] = l + 1; best[1] = r; }
}`,
          python: `def longest_palindrome(s):
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1; r += 1
        return s[l+1:r]
    best = ""
    for i in range(len(s)):
        for cand in (expand(i, i), expand(i, i + 1)):
            if len(cand) > len(best):
                best = cand
    return best`,
          javascript: `function longestPalindrome(s) {
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    return s.slice(l + 1, r);
  };
  let best = '';
  for (let i = 0; i < s.length; i++) {
    for (const cand of [expand(i, i), expand(i, i + 1)]) {
      if (cand.length > best.length) best = cand;
    }
  }
  return best;
}`,
        },
      },
    ],
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    icon: '🔗',
    description: 'Pointer manipulation mastery: reversal, cycle detection, merging. Slow/fast pointers are your best friend.',
    items: [
      {
        id: 'reverse-linked-list',
        title: 'Reverse a Linked List',
        difficulty: 'Easy',
        tags: ['pointers', 'iteration'],
        description: 'Walk the list flipping each node\u2019s next pointer backwards. Must-know pattern used inside dozens of harder problems.',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: {
          cpp: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    while (head) {
        ListNode* next = head->next;
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;
}`,
          java: `public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    while (head != null) {
        ListNode next = head.next;
        head.next = prev;
        prev = head;
        head = next;
    }
    return prev;
}`,
          python: `def reverse_list(head):
    prev = None
    while head:
        head.next, prev, head = prev, head, head.next
    return prev`,
          javascript: `function reverseList(head) {
  let prev = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}`,
        },
      },
      {
        id: 'detect-cycle',
        title: 'Linked List Cycle Detection (Floyd\u2019s Tortoise & Hare)',
        difficulty: 'Easy',
        tags: ['slow-fast-pointers', 'math'],
        description: 'Two pointers moving at different speeds; if they ever meet there is a cycle. To find the cycle start, reset one pointer to head and move both one step at a time.',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: {
          cpp: `ListNode *detectCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {           // cycle found
            slow = head;
            while (slow != fast) { slow = slow->next; fast = fast->next; }
            return slow;              // cycle start
        }
    }
    return nullptr;
}`,
          java: `public ListNode detectCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            slow = head;
            while (slow != fast) { slow = slow.next; fast = fast.next; }
            return slow;
        }
    }
    return null;
}`,
          python: `def detect_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:          # cycle found
            slow = head
            while slow is not fast:
                slow = slow.next
                fast = fast.next
            return slow           # cycle start
    return None`,
          javascript: `function detectCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      slow = head;
      while (slow !== fast) { slow = slow.next; fast = fast.next; }
      return slow;
    }
  }
  return null;
}`,
        },
      },
      {
        id: 'merge-two-lists',
        title: 'Merge Two Sorted Lists',
        difficulty: 'Easy',
        tags: ['merge', 'recursion'],
        description: 'Merge step of merge sort, on linked lists. The dummy-head trick removes all edge cases.',
        complexity: { time: 'O(n + m)', space: 'O(1)' },
        code: {
          cpp: `ListNode* mergeTwoLists(ListNode* a, ListNode* b) {
    ListNode dummy, *tail = &dummy;
    while (a && b) {
        if (a->val <= b->val) { tail->next = a; a = a->next; }
        else                  { tail->next = b; b = b->next; }
        tail = tail->next;
    }
    tail->next = a ? a : b;
    return dummy.next;
}`,
          java: `public ListNode mergeTwoLists(ListNode a, ListNode b) {
    ListNode dummy = new ListNode(0), tail = dummy;
    while (a != null && b != null) {
        if (a.val <= b.val) { tail.next = a; a = a.next; }
        else                { tail.next = b; b = b.next; }
        tail = tail.next;
    }
    tail.next = (a != null) ? a : b;
    return dummy.next;
}`,
          python: `def merge_two_lists(a, b):
    dummy = tail = ListNode(0)
    while a and b:
        if a.val <= b.val:
            tail.next, a = a, a.next
        else:
            tail.next, b = b, b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next`,
          javascript: `function mergeTwoLists(a, b) {
  const dummy = { next: null };
  let tail = dummy;
  while (a && b) {
    if (a.val <= b.val) { tail.next = a; a = a.next; }
    else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a || b;
  return dummy.next;
}`,
        },
      },
    ],
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    icon: '🥞',
    description: 'LIFO vs FIFO. Monotonic stacks solve "next greater element" family problems in O(n).',
    items: [
      {
        id: 'valid-parentheses',
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        tags: ['stack', 'matching'],
        description: 'Push openers, pop and match closers. The stack empties exactly when the string is valid.',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: {
          cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else {
            if (st.empty()) return false;
            char open = st.top(); st.pop();
            if ((c == ')' && open != '(') ||
                (c == ']' && open != '[') ||
                (c == '}' && open != '{')) return false;
        }
    }
    return st.empty();
}`,
          java: `public boolean isValid(String s) {
    Deque<Character> st = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if ("([{".indexOf(c) >= 0) st.push(c);
        else if (st.isEmpty() || (c == ')' ? st.pop() != '('
                 : c == ']' ? st.pop() != '[' : st.pop() != '{')) return false;
    }
    return st.isEmpty();
}`,
          python: `def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for c in s:
        if c in pairs:
            if not stack or stack.pop() != pairs[c]:
                return False
        else:
            stack.append(c)
    return not stack`,
          javascript: `function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const c of s) {
    if (c in pairs) {
      if (stack.pop() !== pairs[c]) return false;
    } else stack.push(c);
  }
  return stack.length === 0;
}`,
        },
      },
      {
        id: 'next-greater-element',
        title: 'Next Greater Element (Monotonic Stack)',
        difficulty: 'Medium',
        tags: ['monotonic-stack', 'pattern'],
        description: 'Keep a stack of indices with decreasing values. When a bigger value arrives, it is the answer for everything it pops. O(n) for what naively takes O(n²).',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: {
          cpp: `vector<int> nextGreater(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, -1);
    stack<int> st;                       // indices, decreasing values
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            res[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return res;
}`,
          java: `public int[] nextGreater(int[] nums) {
    int n = nums.length;
    int[] res = new int[n];
    Arrays.fill(res, -1);
    Deque<Integer> st = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        while (!st.isEmpty() && nums[i] > nums[st.peek()])
            res[st.pop()] = nums[i];
        st.push(i);
    }
    return res;
}`,
          python: `def next_greater(nums):
    n = len(nums)
    res = [-1] * n
    stack = []                            # indices, decreasing values
    for i, num in enumerate(nums):
        while stack and num > nums[stack[-1]]:
            res[stack.pop()] = num
        stack.append(i)
    return res`,
          javascript: `function nextGreater(nums) {
  const res = new Array(nums.length).fill(-1);
  const stack = [];
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack.at(-1)])
      res[stack.pop()] = nums[i];
    stack.push(i);
  }
  return res;
}`,
        },
      },
    ],
  },
  {
    id: 'hashing',
    title: 'Hashing',
    icon: '#️⃣',
    description: 'Trade memory for speed. Sets and maps turn O(n²) searches into O(n) lookups.',
    items: [
      {
        id: 'group-anagrams',
        title: 'Group Anagrams',
        difficulty: 'Medium',
        tags: ['hash-map', 'grouping'],
        description: 'Key each word by its sorted letters (or a 26-letter count signature) and bucket everything in one pass.',
        complexity: { time: 'O(n · k log k)', space: 'O(n · k)' },
        code: {
          cpp: `vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> buckets;
    for (string& s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        buckets[key].push_back(s);
    }
    vector<vector<string>> res;
    for (auto& [k, v] : buckets) res.push_back(v);
    return res;
}`,
          java: `public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> buckets = new HashMap<>();
    for (String s : strs) {
        char[] arr = s.toCharArray();
        Arrays.sort(arr);
        buckets.computeIfAbsent(new String(arr), k -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(buckets.values());
}`,
          python: `from collections import defaultdict

def group_anagrams(strs):
    buckets = defaultdict(list)
    for s in strs:
        buckets[''.join(sorted(s))].append(s)
    return list(buckets.values())`,
          javascript: `function groupAnagrams(strs) {
  const buckets = new Map();
  for (const s of strs) {
    const key = [...s].sort().join('');
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(s);
  }
  return [...buckets.values()];
}`,
        },
      },
      {
        id: 'longest-consecutive-sequence',
        title: 'Longest Consecutive Sequence',
        difficulty: 'Medium',
        tags: ['hash-set', 'clever-trick'],
        description: 'Dump everything into a set. Only start counting from numbers that have no left neighbor — every number is visited at most twice. O(n) total.',
        complexity: { time: 'O(n)', space: 'O(n)' },
        code: {
          cpp: `int longestConsecutive(vector<int>& nums) {
    unordered_set<int> set(nums.begin(), nums.end());
    int best = 0;
    for (int num : set) {
        if (!set.count(num - 1)) {          // start of a sequence
            int len = 1;
            while (set.count(num + len)) len++;
            best = max(best, len);
        }
    }
    return best;
}`,
          java: `public int longestConsecutive(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int n : nums) set.add(n);
    int best = 0;
    for (int num : set) {
        if (!set.contains(num - 1)) {
            int len = 1;
            while (set.contains(num + len)) len++;
            best = Math.max(best, len);
        }
    }
    return best;
}`,
          python: `def longest_consecutive(nums):
    num_set = set(nums)
    best = 0
    for num in num_set:
        if num - 1 not in num_set:       # start of a sequence
            length = 1
            while num + length in num_set:
                length += 1
            best = max(best, length)
    return best`,
          javascript: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const num of set) {
    if (!set.has(num - 1)) {
      let len = 1;
      while (set.has(num + len)) len++;
      best = Math.max(best, len);
    }
  }
  return best;
}`,
        },
      },
    ],
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    icon: '🗂️',
    description: 'Know merge sort, quick sort and heap sort cold — including why each is preferred in which situation.',
    items: [
      {
        id: 'merge-sort',
        title: 'Merge Sort',
        difficulty: 'Medium',
        tags: ['divide-conquer', 'stable'],
        description: 'Split, sort halves recursively, merge. Guaranteed O(n log n) and stable — the workhorse of external sorting.',
        complexity: { time: 'O(n log n)', space: 'O(n)' },
        code: {
          cpp: `void mergeSort(vector<int>& a, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);
    vector<int> tmp;
    int i = l, j = m + 1;
    while (i <= m && j <= r) tmp.push_back(a[i] <= a[j] ? a[i++] : a[j++]);
    while (i <= m) tmp.push_back(a[i++]);
    while (j <= r) tmp.push_back(a[j++]);
    copy(tmp.begin(), tmp.end(), a.begin() + l);
}`,
          java: `void mergeSort(int[] a, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);
    int[] tmp = new int[r - l + 1];
    int i = l, j = m + 1, k = 0;
    while (i <= m && j <= r) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
    while (i <= m) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    System.arraycopy(tmp, 0, a, l, tmp.length);
}`,
          python: `def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: out.append(left[i]); i += 1
        else: out.append(right[j]); j += 1
    return out + left[i:] + right[j:]`,
          javascript: `function mergeSort(a) {
  if (a.length <= 1) return a;
  const mid = a.length >> 1;
  const left = mergeSort(a.slice(0, mid));
  const right = mergeSort(a.slice(mid));
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length)
    out.push(left[i] <= right[j] ? left[i++] : right[j++]);
  return [...out, ...left.slice(i), ...right.slice(j)];
}`,
        },
      },
      {
        id: 'quick-sort',
        title: 'Quick Sort',
        difficulty: 'Medium',
        tags: ['divide-conquer', 'in-place'],
        description: 'Partition around a pivot, recurse on both sides. Fast in practice; O(n²) worst case avoided by random pivots.',
        complexity: { time: 'O(n log n) avg', space: 'O(log n)' },
        code: {
          cpp: `int partition(vector<int>& a, int lo, int hi) {
    int pivot = a[hi], i = lo;
    for (int j = lo; j < hi; j++)
        if (a[j] < pivot) swap(a[i++], a[j]);
    swap(a[i], a[hi]);
    return i;
}
void quickSort(vector<int>& a, int lo, int hi) {
    if (lo >= hi) return;
    int p = partition(a, lo, hi);
    quickSort(a, lo, p - 1);
    quickSort(a, p + 1, hi);
}`,
          java: `int partition(int[] a, int lo, int hi) {
    int pivot = a[hi], i = lo;
    for (int j = lo; j < hi; j++)
        if (a[j] < pivot) { int t = a[i]; a[i] = a[j]; a[j] = t; i++; }
    int t = a[i]; a[i] = a[hi]; a[hi] = t;
    return i;
}
void quickSort(int[] a, int lo, int hi) {
    if (lo >= hi) return;
    int p = partition(a, lo, hi);
    quickSort(a, lo, p - 1);
    quickSort(a, p + 1, hi);
}`,
          python: `def quick_sort(a, lo=0, hi=None):
    if hi is None: hi = len(a) - 1
    if lo >= hi: return
    pivot, i = a[hi], lo
    for j in range(lo, hi):
        if a[j] < pivot:
            a[i], a[j] = a[j], a[i]
            i += 1
    a[i], a[hi] = a[hi], a[i]
    quick_sort(a, lo, i - 1)
    quick_sort(a, i + 1, hi)`,
          javascript: `function quickSort(a, lo = 0, hi = a.length - 1) {
  if (lo >= hi) return a;
  const partition = () => {
    const pivot = a[hi];
    let i = lo;
    for (let j = lo; j < hi; j++)
      if (a[j] < pivot) [a[i], a[j]] = [a[j], a[i]], i++;
    [a[i], a[hi]] = [a[hi], a[i]];
    return i;
  };
  const p = partition();
  quickSort(a, lo, p - 1);
  quickSort(a, p + 1, hi);
  return a;
}`,
        },
      },
    ],
  },
  {
    id: 'searching',
    title: 'Binary Search',
    icon: '🔍',
    description: 'The most reused algorithm in interviews. Master the invariant and every variant becomes easy.',
    items: [
      {
        id: 'classic-binary-search',
        title: 'Classic Binary Search',
        difficulty: 'Easy',
        tags: ['binary-search', 'fundamental'],
        description: 'Halve the search space each step. The half-open interval [lo, hi) version avoids off-by-one bugs.',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        code: {
          cpp: `int search(vector<int>& nums, int target) {
    int lo = 0, hi = nums.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
          java: `public int search(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
          python: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target: return mid
        if nums[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1`,
          javascript: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
        },
      },
      {
        id: 'search-rotated',
        title: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        tags: ['binary-search', 'variant'],
        description: 'A rotated sorted array has exactly one sorted half. Figure out which half is sorted, then decide where the target lives.',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        code: {
          cpp: `int search(vector<int>& nums, int target) {
    int lo = 0, hi = nums.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[lo] <= nums[mid]) {            // left half sorted
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {                                 // right half sorted
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}`,
          java: `public int search(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[lo] <= nums[mid]) {
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}`,
          python: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target: return mid
        if nums[lo] <= nums[mid]:                # left half sorted
            if nums[lo] <= target < nums[mid]: hi = mid - 1
            else: lo = mid + 1
        else:                                    # right half sorted
            if nums[mid] < target <= nums[hi]: lo = mid + 1
            else: hi = mid - 1
    return -1`,
          javascript: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}`,
        },
      },
    ],
  },
  {
    id: 'trees',
    title: 'Trees',
    icon: '🌳',
    description: 'Binary trees, traversals, depth and diameter. Recursion expresses tree problems beautifully.',
    items: [
      {
        id: 'tree-traversals',
        title: 'Tree Traversals (Inorder / Preorder / Postorder)',
        difficulty: 'Easy',
        tags: ['recursion', 'traversal'],
        description: 'Three DFS orders, one recursive template. Inorder on a BST yields sorted order — remember that.',
        complexity: { time: 'O(n)', space: 'O(h)' },
        code: {
          cpp: `void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);          // left
    cout << root->val << " ";     // visit
    inorder(root->right);         // right
}
// Preorder: visit, left, right   → copy tree, serialize
// Postorder: left, right, visit  → delete tree, compute children first`,
          java: `void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);          // left
    System.out.print(root.val);  // visit
    inorder(root.right);         // right
}
// Preorder: visit, left, right
// Postorder: left, right, visit`,
          python: `def inorder(root):
    if not root:
        return
    inorder(root.left)     # left
    print(root.val)        # visit
    inorder(root.right)    # right

# Preorder: visit, left, right
# Postorder: left, right, visit`,
          javascript: `function inorder(root) {
  if (!root) return;
  inorder(root.left);    // left
  console.log(root.val); // visit
  inorder(root.right);   // right
}
// Preorder: visit, left, right
// Postorder: left, right, visit`,
        },
      },
      {
        id: 'max-depth',
        title: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        tags: ['recursion', 'dfs'],
        description: 'Depth = 1 + max(depth of children). A one-liner that teaches the recursive tree template.',
        complexity: { time: 'O(n)', space: 'O(h)' },
        code: {
          cpp: `int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,
          java: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
          python: `def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
          javascript: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
        },
      },
      {
        id: 'level-order',
        title: 'Level Order Traversal (BFS)',
        difficulty: 'Medium',
        tags: ['bfs', 'queue'],
        description: 'Process the tree level by level with a queue. Count nodes per level to group them.',
        complexity: { time: 'O(n)', space: 'O(w)' },
        code: {
          cpp: `vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> res;
    queue<TreeNode*> q;
    if (root) q.push(root);
    while (!q.empty()) {
        int size = q.size();
        vector<int> level;
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`,
          java: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    Queue<TreeNode> q = new LinkedList<>();
    if (root != null) q.offer(root);
    while (!q.isEmpty()) {
        int size = q.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = q.poll();
            level.add(node.val);
            if (node.left != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
        res.add(level);
    }
    return res;
}`,
          python: `from collections import deque

def level_order(root):
    res, q = [], deque([root] if root else [])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
          javascript: `function levelOrder(root) {
  const res = [];
  const q = root ? [root] : [];
  while (q.length) {
    const level = [];
    for (let i = q.length; i > 0; i--) {
      const node = q.shift();
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
  }
  return res;
}`,
        },
      },
    ],
  },
  {
    id: 'bst',
    title: 'Binary Search Trees',
    icon: '🌲',
    description: 'Ordered trees where every comparison eliminates half the tree. The inorder invariant unlocks most problems.',
    items: [
      {
        id: 'validate-bst',
        title: 'Validate BST',
        difficulty: 'Medium',
        tags: ['recursion', 'bounds'],
        description: 'Each node constrains its subtree: pass down (min, max) bounds, or use inorder traversal and check it\u2019s strictly increasing.',
        complexity: { time: 'O(n)', space: 'O(h)' },
        code: {
          cpp: `bool valid(TreeNode* root, long lo, long hi) {
    if (!root) return true;
    if (root->val <= lo || root->val >= hi) return false;
    return valid(root->left, lo, root->val) &&
           valid(root->right, root->val, hi);
}
bool isValidBST(TreeNode* root) {
    return valid(root, LONG_MIN, LONG_MAX);
}`,
          java: `boolean valid(TreeNode root, long lo, long hi) {
    if (root == null) return true;
    if (root.val <= lo || root.val >= hi) return false;
    return valid(root.left, lo, root.val) && valid(root.right, root.val, hi);
}
public boolean isValidBST(TreeNode root) {
    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
}`,
          python: `def is_valid_bst(root, lo=float('-inf'), hi=float('inf')):
    if not root:
        return True
    if not (lo < root.val < hi):
        return False
    return is_valid_bst(root.left, lo, root.val) and \\
           is_valid_bst(root.right, root.val, hi)`,
          javascript: `function isValidBST(root, lo = -Infinity, hi = Infinity) {
  if (!root) return true;
  if (root.val <= lo || root.val >= hi) return false;
  return isValidBST(root.left, lo, root.val) &&
         isValidBST(root.right, root.val, hi);
}`,
        },
      },
      {
        id: 'bst-search-insert',
        title: 'BST Search & Insert',
        difficulty: 'Easy',
        tags: ['recursion', 'fundamental'],
        description: 'Compare and descend: go left for smaller, right for larger. Insert at the first empty slot found.',
        complexity: { time: 'O(h)', space: 'O(h)' },
        code: {
          cpp: `TreeNode* searchBST(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    return val < root->val ? searchBST(root->left, val)
                           : searchBST(root->right, val);
}
TreeNode* insertIntoBST(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val) root->left = insertIntoBST(root->left, val);
    else root->right = insertIntoBST(root->right, val);
    return root;
}`,
          java: `public TreeNode searchBST(TreeNode root, int val) {
    if (root == null || root.val == val) return root;
    return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
}
public TreeNode insertIntoBST(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val < root.val) root.left = insertIntoBST(root.left, val);
    else root.right = insertIntoBST(root.right, val);
    return root;
}`,
          python: `def search_bst(root, val):
    if not root or root.val == val:
        return root
    return search_bst(root.left if val < root.val else root.right, val)

def insert_into_bst(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert_into_bst(root.left, val)
    else:
        root.right = insert_into_bst(root.right, val)
    return root`,
          javascript: `function searchBST(root, val) {
  if (!root || root.val === val) return root;
  return searchBST(val < root.val ? root.left : root.right, val);
}
function insertIntoBST(root, val) {
  if (!root) return { val, left: null, right: null };
  if (val < root.val) root.left = insertIntoBST(root.left, val);
  else root.right = insertIntoBST(root.right, val);
  return root;
}`,
        },
      },
    ],
  },
  {
    id: 'heaps',
    title: 'Heaps / Priority Queues',
    icon: '⛰️',
    description: 'Instant access to the min or max. The tool behind top-k, merging k lists, Dijkstra and scheduling.',
    items: [
      {
        id: 'kth-largest',
        title: 'Kth Largest Element',
        difficulty: 'Medium',
        tags: ['heap', 'top-k'],
        description: 'Keep a min-heap of size k. The root is the kth largest. Better than full-sorting when k \u226a n or streaming.',
        complexity: { time: 'O(n log k)', space: 'O(k)' },
        code: {
          cpp: `int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int n : nums) {
        minHeap.push(n);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}`,
          java: `public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int n : nums) {
        minHeap.offer(n);
        if (minHeap.size() > k) minHeap.poll();
    }
    return minHeap.peek();
}`,
          python: `import heapq

def find_kth_largest(nums, k):
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0]

# One-liner: heapq.nlargest(k, nums)[-1]`,
          javascript: `// JavaScript has no built-in heap — here is a minimal binary min-heap
class MinHeap {
  constructor() { this.a = []; }
  push(x) {
    this.a.push(x);
    let i = this.a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.a[p] <= this.a[i]) break;
      [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
      i = p;
    }
  }
  pop() {
    const top = this.a[0], last = this.a.pop();
    if (this.a.length) {
      this.a[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < this.a.length && this.a[l] < this.a[m]) m = l;
        if (r < this.a.length && this.a[r] < this.a[m]) m = r;
        if (m === i) break;
        [this.a[i], this.a[m]] = [this.a[m], this.a[i]];
        i = m;
      }
    }
    return top;
  }
  get size() { return this.a.length; }
}

function findKthLargest(nums, k) {
  const h = new MinHeap();
  for (const n of nums) {
    h.push(n);
    if (h.size > k) h.pop();
  }
  return h.a[0];
}`,
        },
      },
      {
        id: 'merge-k-lists',
        title: 'Merge K Sorted Lists',
        difficulty: 'Hard',
        tags: ['heap', 'divide-conquer'],
        description: 'Put each list head in a min-heap; repeatedly pop the smallest and push its successor. Also solvable by pairwise divide-and-conquer merging.',
        complexity: { time: 'O(N log k)', space: 'O(k)' },
        code: {
          cpp: `struct Cmp { bool operator()(ListNode* a, ListNode* b) { return a->val > b->val; } };
ListNode* mergeKLists(vector<ListNode*>& lists) {
    priority_queue<ListNode*, vector<ListNode*>, Cmp> pq;
    for (auto l : lists) if (l) pq.push(l);
    ListNode dummy, *tail = &dummy;
    while (!pq.empty()) {
        ListNode* node = pq.top(); pq.pop();
        tail->next = node; tail = tail->next;
        if (node->next) pq.push(node->next);
    }
    return dummy.next;
}`,
          java: `public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
    for (ListNode l : lists) if (l != null) pq.offer(l);
    ListNode dummy = new ListNode(0), tail = dummy;
    while (!pq.isEmpty()) {
        ListNode node = pq.poll();
        tail.next = node; tail = tail.next;
        if (node.next != null) pq.offer(node.next);
    }
    return dummy.next;
}`,
          python: `import heapq

def merge_k_lists(lists):
    heap = [(l.val, i, l) for i, l in enumerate(lists) if l]
    heapq.heapify(heap)
    dummy = tail = ListNode(0)
    while heap:
        val, i, node = heapq.heappop(heap)
        tail.next, tail = node, node
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
          javascript: `// Uses the MinHeap class from the Kth Largest example
function mergeKLists(lists, MinHeap) {
  const h = new MinHeap((a, b) => a.val - b.val);
  for (const l of lists) if (l) h.push(l);
  const dummy = { next: null };
  let tail = dummy;
  while (h.size) {
    const node = h.pop();
    tail.next = node; tail = tail.next;
    if (node.next) h.push(node.next);
  }
  return dummy.next;
}`,
        },
      },
    ],
  },
  {
    id: 'graphs',
    title: 'Graphs',
    icon: '🕸️',
    description: 'BFS for shortest paths in unweighted graphs, DFS for structure, and Union-Find for connectivity.',
    items: [
      {
        id: 'bfs-shortest-path',
        title: 'BFS — Shortest Path in Unweighted Graph',
        difficulty: 'Medium',
        tags: ['bfs', 'queue'],
        description: 'Explore level by level; the first time you reach a node, that is the shortest path. Works on grids too.',
        complexity: { time: 'O(V + E)', space: 'O(V)' },
        code: {
          cpp: `vector<int> bfs(int n, vector<vector<int>>& adj, int src) {
    vector<int> dist(n, -1);
    queue<int> q;
    dist[src] = 0;
    q.push(src);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}`,
          java: `public int[] bfs(int n, List<List<Integer>> adj, int src) {
    int[] dist = new int[n];
    Arrays.fill(dist, -1);
    Queue<Integer> q = new LinkedList<>();
    dist[src] = 0;
    q.offer(src);
    while (!q.isEmpty()) {
        int u = q.poll();
        for (int v : adj.get(u)) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.offer(v);
            }
        }
    }
    return dist;
}`,
          python: `from collections import deque

def bfs(adj, src):
    dist = {src: 0}
    q = deque([src])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if v not in dist:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist`,
          javascript: `function bfs(adj, src) {
  const dist = new Map([[src, 0]]);
  const q = [src];
  while (q.length) {
    const u = q.shift();
    for (const v of adj[u] || []) {
      if (!dist.has(v)) {
        dist.set(v, dist.get(u) + 1);
        q.push(v);
      }
    }
  }
  return dist;
}`,
        },
      },
      {
        id: 'dfs-islands',
        title: 'Number of Islands (DFS on Grid)',
        difficulty: 'Medium',
        tags: ['dfs', 'flood-fill'],
        description: 'Each unvisited land cell starts a flood fill that sinks its whole island. Count the flood fills.',
        complexity: { time: 'O(m · n)', space: 'O(m · n)' },
        code: {
          cpp: `void sink(vector<vector<char>>& grid, int i, int j) {
    if (i < 0 || i >= grid.size() || j < 0 || j >= grid[0].size() ||
        grid[i][j] != '1') return;
    grid[i][j] = '0';
    sink(grid, i + 1, j); sink(grid, i - 1, j);
    sink(grid, i, j + 1); sink(grid, i, j - 1);
}
int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int i = 0; i < grid.size(); i++)
        for (int j = 0; j < grid[0].size(); j++)
            if (grid[i][j] == '1') { count++; sink(grid, i, j); }
    return count;
}`,
          java: `void sink(char[][] grid, int i, int j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length
        || grid[i][j] != '1') return;
    grid[i][j] = '0';
    sink(grid, i + 1, j); sink(grid, i - 1, j);
    sink(grid, i, j + 1); sink(grid, i, j - 1);
}
public int numIslands(char[][] grid) {
    int count = 0;
    for (int i = 0; i < grid.length; i++)
        for (int j = 0; j < grid[0].length; j++)
            if (grid[i][j] == '1') { count++; sink(grid, i, j); }
    return count;
}`,
          python: `def num_islands(grid):
    rows, cols = len(grid), len(grid[0]) if grid else 0

    def sink(i, j):
        if i < 0 or i >= rows or j < 0 or j >= cols or grid[i][j] != '1':
            return
        grid[i][j] = '0'
        for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            sink(i + di, j + dj)

    count = 0
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == '1':
                count += 1
                sink(i, j)
    return count`,
          javascript: `function numIslands(grid) {
  const rows = grid.length, cols = grid[0]?.length || 0;
  const sink = (i, j) => {
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] !== '1') return;
    grid[i][j] = '0';
    sink(i + 1, j); sink(i - 1, j); sink(i, j + 1); sink(i, j - 1);
  };
  let count = 0;
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      if (grid[i][j] === '1') { count++; sink(i, j); }
  return count;
}`,
        },
      },
      {
        id: 'union-find',
        title: 'Union-Find (Disjoint Set) with Path Compression',
        difficulty: 'Medium',
        tags: ['union-find', 'connectivity'],
        description: 'Near-O(1) connectivity checks. The backbone of Kruskal\u2019s MST and dynamic connectivity problems.',
        complexity: { time: 'O(α(n)) amortized', space: 'O(n)' },
        code: {
          cpp: `struct DSU {
    vector<int> parent, rank_;
    DSU(int n) : parent(n), rank_(n, 0) { iota(parent.begin(), parent.end(), 0); }
    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (rank_[a] < rank_[b]) swap(a, b);
        parent[b] = a;
        if (rank_[a] == rank_[b]) rank_[a]++;
        return true;
    }
};`,
          java: `class DSU {
    int[] parent, rank;
    DSU(int n) {
        parent = new int[n]; rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }
    boolean unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (rank[a] < rank[b]) { int t = a; a = b; b = t; }
        parent[b] = a;
        if (rank[a] == rank[b]) rank[a]++;
        return true;
    }
}`,
          python: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def unite(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return False
        if self.rank[a] < self.rank[b]:
            a, b = b, a
        self.parent[b] = a
        if self.rank[a] == self.rank[b]:
            self.rank[a] += 1
        return True`,
          javascript: `class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  unite(a, b) {
    a = this.find(a); b = this.find(b);
    if (a === b) return false;
    if (this.rank[a] < this.rank[b]) [a, b] = [b, a];
    this.parent[b] = a;
    if (this.rank[a] === this.rank[b]) this.rank[a]++;
    return true;
  }
}`,
        },
      },
    ],
  },
  {
    id: 'recursion-backtracking',
    title: 'Recursion & Backtracking',
    icon: '🌀',
    description: 'Explore every choice, undo, try the next one. Backtracking powers permutations, subsets, N-Queens and Sudoku.',
    items: [
      {
        id: 'subsets',
        title: 'Subsets (Power Set)',
        difficulty: 'Medium',
        tags: ['backtracking', 'combinations'],
        description: 'At each index, choose to include or exclude the element. 2ⁿ subsets total — the canonical backtracking template.',
        complexity: { time: 'O(n · 2ⁿ)', space: 'O(n)' },
        code: {
          cpp: `void backtrack(vector<int>& nums, int start, vector<int>& cur,
               vector<vector<int>>& res) {
    res.push_back(cur);
    for (int i = start; i < nums.size(); i++) {
        cur.push_back(nums[i]);          // choose
        backtrack(nums, i + 1, cur, res); // explore
        cur.pop_back();                  // un-choose
    }
}
vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> cur;
    backtrack(nums, 0, cur, res);
    return res;
}`,
          java: `void backtrack(int[] nums, int start, List<Integer> cur, List<List<Integer>> res) {
    res.add(new ArrayList<>(cur));
    for (int i = start; i < nums.length; i++) {
        cur.add(nums[i]);                  // choose
        backtrack(nums, i + 1, cur, res);  // explore
        cur.remove(cur.size() - 1);        // un-choose
    }
}
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), res);
    return res;
}`,
          python: `def subsets(nums):
    res, cur = [], []

    def backtrack(start):
        res.append(cur[:])
        for i in range(start, len(nums)):
            cur.append(nums[i])     # choose
            backtrack(i + 1)        # explore
            cur.pop()               # un-choose

    backtrack(0)
    return res`,
          javascript: `function subsets(nums) {
  const res = [], cur = [];
  const backtrack = (start) => {
    res.push([...cur]);
    for (let i = start; i < nums.length; i++) {
      cur.push(nums[i]);      // choose
      backtrack(i + 1);       // explore
      cur.pop();              // un-choose
    }
  };
  backtrack(0);
  return res;
}`,
        },
      },
      {
        id: 'n-queens',
        title: 'N-Queens',
        difficulty: 'Hard',
        tags: ['backtracking', 'constraint'],
        description: 'Place one queen per row, track attacked columns and diagonals in sets. Prune aggressively.',
        complexity: { time: 'O(n!)', space: 'O(n)' },
        code: {
          cpp: `void solve(int row, int n, vector<string>& board,
           unordered_set<int>& cols, unordered_set<int>& diag, unordered_set<int>& anti,
           vector<vector<string>>& res) {
    if (row == n) { res.push_back(board); return; }
    for (int col = 0; col < n; col++) {
        if (cols.count(col) || diag.count(row - col) || anti.count(row + col)) continue;
        board[row][col] = 'Q';
        cols.insert(col); diag.insert(row - col); anti.insert(row + col);
        solve(row + 1, n, board, cols, diag, anti, res);
        cols.erase(col); diag.erase(row - col); anti.erase(row + col);
        board[row][col] = '.';
    }
}`,
          java: `void solve(int row, int n, char[][] board, Set<Integer> cols,
           Set<Integer> diag, Set<Integer> anti, List<List<String>> res) {
    if (row == n) { save(board, res); return; }
    for (int col = 0; col < n; col++) {
        if (cols.contains(col) || diag.contains(row - col) || anti.contains(row + col)) continue;
        board[row][col] = 'Q';
        cols.add(col); diag.add(row - col); anti.add(row + col);
        solve(row + 1, n, board, cols, diag, anti, res);
        cols.remove(col); diag.remove(row - col); anti.remove(row + col);
        board[row][col] = '.';
    }
}`,
          python: `def solve_n_queens(n):
    res, board = [], [['.'] * n for _ in range(n)]
    cols, diag, anti = set(), set(), set()

    def place(row):
        if row == n:
            res.append([''.join(r) for r in board])
            return
        for col in range(n):
            if col in cols or (row - col) in diag or (row + col) in anti:
                continue
            board[row][col] = 'Q'
            cols.add(col); diag.add(row - col); anti.add(row + col)
            place(row + 1)
            cols.remove(col); diag.remove(row - col); anti.remove(row + col)
            board[row][col] = '.'

    place(0)
    return res`,
          javascript: `function solveNQueens(n) {
  const res = [], board = Array.from({ length: n }, () => Array(n).fill('.'));
  const cols = new Set(), diag = new Set(), anti = new Set();
  const place = (row) => {
    if (row === n) {
      res.push(board.map(r => r.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag.has(row - col) || anti.has(row + col)) continue;
      board[row][col] = 'Q';
      cols.add(col); diag.add(row - col); anti.add(row + col);
      place(row + 1);
      cols.delete(col); diag.delete(row - col); anti.delete(row + col);
      board[row][col] = '.';
    }
  };
  place(0);
  return res;
}`,
        },
      },
    ],
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    icon: '🧮',
    description: 'Overlapping subproblems + optimal substructure. Start with memoized recursion, then convert to tables.',
    items: [
      {
        id: 'climbing-stairs',
        title: 'Climbing Stairs (Fibonacci DP)',
        difficulty: 'Easy',
        tags: ['dp', 'intro'],
        description: 'Ways(n) = Ways(n-1) + Ways(n-2). Your first DP: recognize the recurrence, then just keep two variables.',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: {
          cpp: `int climbStairs(int n) {
    int a = 1, b = 1;              // ways(0), ways(1)
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b; b = c;
    }
    return b;
}`,
          java: `public int climbStairs(int n) {
    int a = 1, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b; b = c;
    }
    return b;
}`,
          python: `def climb_stairs(n):
    a, b = 1, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
          javascript: `function climbStairs(n) {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`,
        },
      },
      {
        id: 'house-robber',
        title: 'House Robber',
        difficulty: 'Medium',
        tags: ['dp', 'decision'],
        description: 'At each house: rob it (and skip the neighbor) or skip it. rob = max(rob2 + loot, rob1).',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: {
          cpp: `int rob(vector<int>& nums) {
    int rob1 = 0, rob2 = 0;         // best up to i-2, up to i-1
    for (int n : nums) {
        int cur = max(rob1 + n, rob2);
        rob1 = rob2;
        rob2 = cur;
    }
    return rob2;
}`,
          java: `public int rob(int[] nums) {
    int rob1 = 0, rob2 = 0;
    for (int n : nums) {
        int cur = Math.max(rob1 + n, rob2);
        rob1 = rob2;
        rob2 = cur;
    }
    return rob2;
}`,
          python: `def rob(nums):
    rob1 = rob2 = 0
    for loot in nums:
        rob1, rob2 = rob2, max(rob1 + loot, rob2)
    return rob2`,
          javascript: `function rob(nums) {
  let rob1 = 0, rob2 = 0;
  for (const loot of nums) {
    [rob1, rob2] = [rob2, Math.max(rob1 + loot, rob2)];
  }
  return rob2;
}`,
        },
      },
      {
        id: 'coin-change',
        title: 'Coin Change (Unbounded Knapsack)',
        difficulty: 'Medium',
        tags: ['dp', 'knapsack'],
        description: 'dp[x] = fewest coins to make amount x. Try every coin for every amount; dp[amount] unreachable means -1.',
        complexity: { time: 'O(n · amount)', space: 'O(amount)' },
        code: {
          cpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int x = 1; x <= amount; x++)
        for (int c : coins)
            if (c <= x) dp[x] = min(dp[x], dp[x - c] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}`,
          java: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int x = 1; x <= amount; x++)
        for (int c : coins)
            if (c <= x) dp[x] = Math.min(dp[x], dp[x - c] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}`,
          python: `def coin_change(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for x in range(1, amount + 1):
        for c in coins:
            if c <= x:
                dp[x] = min(dp[x], dp[x - c] + 1)
    return dp[amount] if dp[amount] <= amount else -1`,
          javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let x = 1; x <= amount; x++)
    for (const c of coins)
      if (c <= x) dp[x] = Math.min(dp[x], dp[x - c] + 1);
  return dp[amount] > amount ? -1 : dp[amount];
}`,
        },
      },
      {
        id: 'longest-common-subsequence',
        title: 'Longest Common Subsequence',
        difficulty: 'Medium',
        tags: ['dp', '2d-table', 'strings'],
        description: 'The mother of all string DPs. Match: 1 + diagonal; else: max of up and left. Edit distance is its close cousin.',
        complexity: { time: 'O(m · n)', space: 'O(m · n)' },
        code: {
          cpp: `int longestCommonSubsequence(string a, string b) {
    int m = a.size(), n = b.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = a[i-1] == b[j-1]
                ? dp[i-1][j-1] + 1
                : max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}`,
          java: `public int longestCommonSubsequence(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = a.charAt(i-1) == b.charAt(j-1)
                ? dp[i-1][j-1] + 1
                : Math.max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}`,
          python: `def lcs(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = dp[i-1][j-1] + 1 if a[i-1] == b[j-1] \\
                else max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
          javascript: `function longestCommonSubsequence(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1] + 1
        : Math.max(dp[i-1][j], dp[i][j-1]);
  return dp[m][n];
}`,
        },
      },
    ],
  },
  {
    id: 'greedy',
    title: 'Greedy Algorithms',
    icon: '🪙',
    description: 'Make the locally best choice and prove it works. Interval scheduling is the pattern to internalize.',
    items: [
      {
        id: 'interval-scheduling',
        title: 'Non-overlapping Intervals (Interval Scheduling)',
        difficulty: 'Medium',
        tags: ['greedy', 'sorting', 'intervals'],
        description: 'Sort by earliest end time; greedily keep every interval that doesn\u2019t conflict. Provably optimal.',
        complexity: { time: 'O(n log n)', space: 'O(1)' },
        code: {
          cpp: `int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(),
         [](auto& a, auto& b) { return a[1] < b[1]; });
    int kept = 0, end = INT_MIN;
    for (auto& iv : intervals) {
        if (iv[0] >= end) { kept++; end = iv[1]; }
    }
    return intervals.size() - kept;
}`,
          java: `public int eraseOverlapIntervals(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
    int kept = 0, end = Integer.MIN_VALUE;
    for (int[] iv : intervals) {
        if (iv[0] >= end) { kept++; end = iv[1]; }
    }
    return intervals.length - kept;
}`,
          python: `def erase_overlap_intervals(intervals):
    intervals.sort(key=lambda iv: iv[1])
    kept, end = 0, float('-inf')
    for start, finish in intervals:
        if start >= end:
            kept += 1
            end = finish
    return len(intervals) - kept`,
          javascript: `function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let kept = 0, end = -Infinity;
  for (const [start, finish] of intervals) {
    if (start >= end) { kept++; end = finish; }
  }
  return intervals.length - kept;
}`,
        },
      },
      {
        id: 'jump-game',
        title: 'Jump Game',
        difficulty: 'Medium',
        tags: ['greedy', 'reachability'],
        description: 'Track the farthest reachable index as you scan. If you ever pass it, you\u2019re stuck; reach the end and you win.',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: {
          cpp: `bool canJump(vector<int>& nums) {
    int farthest = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > farthest) return false;
        farthest = max(farthest, i + nums[i]);
    }
    return true;
}`,
          java: `public boolean canJump(int[] nums) {
    int farthest = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > farthest) return false;
        farthest = Math.max(farthest, i + nums[i]);
    }
    return true;
}`,
          python: `def can_jump(nums):
    farthest = 0
    for i, jump in enumerate(nums):
        if i > farthest:
            return False
        farthest = max(farthest, i + jump)
    return True`,
          javascript: `function canJump(nums) {
  let farthest = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false;
    farthest = Math.max(farthest, i + nums[i]);
  }
  return true;
}`,
        },
      },
    ],
  },
  {
    id: 'tries',
    title: 'Tries (Prefix Trees)',
    icon: '🔠',
    description: 'Character-by-character trees. Autocomplete, spell check and word games all run on tries.',
    items: [
      {
        id: 'implement-trie',
        title: 'Implement Trie (Insert / Search / Prefix)',
        difficulty: 'Medium',
        tags: ['trie', 'design'],
        description: 'Each node holds a children map and an end-of-word flag. Insert, search and prefix-match all walk the same way.',
        complexity: { time: 'O(L) per op', space: 'O(total chars)' },
        code: {
          cpp: `struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEnd = false;
};
class Trie {
    TrieNode* root = new TrieNode();
    TrieNode* walk(const string& s) {
        TrieNode* node = root;
        for (char c : s) {
            if (!node->children.count(c)) return nullptr;
            node = node->children[c];
        }
        return node;
    }
public:
    void insert(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) node->children[c] = new TrieNode();
            node = node->children[c];
        }
        node->isEnd = true;
    }
    bool search(const string& word) {
        TrieNode* n = walk(word);
        return n && n->isEnd;
    }
    bool startsWith(const string& prefix) { return walk(prefix) != nullptr; }
};`,
          java: `class Trie {
    static class Node {
        Map<Character, Node> children = new HashMap<>();
        boolean isEnd;
    }
    private final Node root = new Node();

    public void insert(String word) {
        Node node = root;
        for (char c : word.toCharArray()) {
            node = node.children.computeIfAbsent(c, k -> new Node());
        }
        node.isEnd = true;
    }
    private Node walk(String s) {
        Node node = root;
        for (char c : s.toCharArray()) {
            node = node.children.get(c);
            if (node == null) return null;
        }
        return node;
    }
    public boolean search(String word) {
        Node n = walk(word);
        return n != null && n.isEnd;
    }
    public boolean startsWith(String prefix) { return walk(prefix) != null; }
}`,
          python: `class Trie:
    def __init__(self):
        self.children = {}
        self.is_end = False

    def insert(self, word):
        node = self
        for c in word:
            node = node.children.setdefault(c, Trie())
        node.is_end = True

    def _walk(self, s):
        node = self
        for c in s:
            if c not in node.children:
                return None
            node = node.children[c]
        return node

    def search(self, word):
        node = self._walk(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        return self._walk(prefix) is not None`,
          javascript: `class Trie {
  constructor() { this.children = {}; this.isEnd = false; }
  insert(word) {
    let node = this;
    for (const c of word) {
      if (!node.children[c]) node.children[c] = new Trie();
      node = node.children[c];
    }
    node.isEnd = true;
  }
  walk(s) {
    let node = this;
    for (const c of s) {
      if (!node.children[c]) return null;
      node = node.children[c];
    }
    return node;
  }
  search(word) {
    const node = this.walk(word);
    return !!node && node.isEnd;
  }
  startsWith(prefix) { return !!this.walk(prefix); }
}`,
        },
      },
    ],
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    icon: '⚙️',
    description: 'XOR cancels duplicates, masks test bits. Small tricks, big O wins.',
    items: [
      {
        id: 'single-number',
        title: 'Single Number (XOR Trick)',
        difficulty: 'Easy',
        tags: ['xor', 'bits'],
        description: 'XOR every number together: pairs cancel (a⊕a = 0), the lone survivor remains. No extra memory.',
        complexity: { time: 'O(n)', space: 'O(1)' },
        code: {
          cpp: `int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int n : nums) result ^= n;
    return result;
}`,
          java: `public int singleNumber(int[] nums) {
    int result = 0;
    for (int n : nums) result ^= n;
    return result;
}`,
          python: `from functools import reduce
import operator

def single_number(nums):
    return reduce(operator.xor, nums, 0)`,
          javascript: `function singleNumber(nums) {
  return nums.reduce((acc, n) => acc ^ n, 0);
}`,
        },
      },
      {
        id: 'count-bits',
        title: 'Counting Bits (Brian Kernighan)',
        difficulty: 'Easy',
        tags: ['bits', 'dp'],
        description: 'n & (n-1) clears the lowest set bit. Repeat until zero and count iterations to get the number of 1-bits.',
        complexity: { time: 'O(k) per number', space: 'O(1)' },
        code: {
          cpp: `int hammingWeight(uint32_t n) {
    int count = 0;
    while (n) {
        n &= (n - 1);   // clears lowest set bit
        count++;
    }
    return count;
}`,
          java: `public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}`,
          python: `def hamming_weight(n):
    count = 0
    while n:
        n &= n - 1      # clears lowest set bit
        count += 1
    return count`,
          javascript: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n &= n - 1;
    count++;
  }
  return count;
}`,
        },
      },
    ],
  },
]

// Stable per-topic accent color (hash of the topic id)
const PALETTE = ['#FF6B6B', '#4D96FF', '#2EBD85', '#B983FF', '#FF7AC3', '#00B8A9', '#FF9F1C', '#5C7CFA']
export function topicColor(id) {
  let h = 0
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return PALETTE[h % PALETTE.length]
}

// Complexity cheat sheet for the reference page
export const complexityGuide = [
  { name: 'O(1)', label: 'Constant', examples: 'Hash map lookup, array access' },
  { name: 'O(log n)', label: 'Logarithmic', examples: 'Binary search, balanced BST ops' },
  { name: 'O(n)', label: 'Linear', examples: 'Array scan, BFS/DFS' },
  { name: 'O(n log n)', label: 'Linearithmic', examples: 'Merge/heap sort, heaps on n items' },
  { name: 'O(n²)', label: 'Quadratic', examples: 'Nested loops, quick sort worst case' },
  { name: 'O(2ⁿ)', label: 'Exponential', examples: 'All subsets, naive recursion' },
  { name: 'O(n!)', label: 'Factorial', examples: 'Permutations, N-Queens' },
]
