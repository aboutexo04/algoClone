import { AlgorithmProblem, Difficulty } from './types';

export const ALGORITHM_PROBLEMS: AlgorithmProblem[] = [
  {
    id: 'binary-search',
    title: '이진 탐색 (Binary Search)',
    category: '탐색 (Search)',
    difficulty: Difficulty.EASY,
    description: `정렬된 리스트에서 특정 값을 찾는 효율적인 알고리즘입니다. 범위를 반씩 줄여가며 탐색합니다.`,
    solutionCode: `def binary_search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        # 중간 인덱스 계산 (정수 나눗셈)
        mid = (left + right) // 2

        if nums[mid] == target:
            return mid  # 값을 찾음
        elif nums[mid] < target:
            left = mid + 1  # 오른쪽 절반 탐색
        else:
            right = mid - 1  # 왼쪽 절반 탐색

    return -1  # 값을 찾지 못함`,
    boilerplate: `def binary_search(nums: list[int], target: int) -> int:
    # 왼쪽의 정답 코드를 보며 그대로 따라 작성해보세요.
    pass`,
    testCases: ['nums = [-1,0,3,5,9,12], target = 9 => 4', 'nums = [-1,0,3,5,9,12], target = 2 => -1']
  },
  {
    id: 'valid-parentheses',
    title: '유효한 괄호 (Valid Parentheses)',
    category: '스택 (Stack)',
    difficulty: Difficulty.EASY,
    description: `괄호가 올바르게 닫혔는지 확인하는 문제입니다. 여는 괄호는 스택에 넣고, 닫는 괄호는 스택에서 꺼내 짝을 맞춥니다.`,
    solutionCode: `def is_valid(s: str) -> bool:
    stack = []
    # 닫는 괄호를 키로, 여는 괄호를 값으로 매핑
    mapping = {")": "(", "}": "{", "]": "["}

    for char in s:
        if char in mapping:
            # 닫는 괄호인 경우: 스택 top과 비교
            top_element = stack.pop() if stack else '#'
            
            if mapping[char] != top_element:
                return False
        else:
            # 여는 괄호인 경우: 스택에 추가
            stack.append(char)

    # 스택이 비어있어야 모든 괄호가 짝이 맞음
    return not stack`,
    boilerplate: `def is_valid(s: str) -> bool:
    # 왼쪽의 정답 코드를 보며 그대로 따라 작성해보세요.
    pass`,
    testCases: ['s = "()[]{}" => True', 's = "(]" => False']
  },
  {
    id: 'bubble-sort',
    title: '버블 정렬 (Bubble Sort)',
    category: '정렬 (Sorting)',
    difficulty: Difficulty.EASY,
    description: `인접한 두 원소를 비교하여 큰 값을 뒤로 보내는 정렬 방식입니다. 구현이 간단하지만 느립니다.`,
    solutionCode: `def bubble_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    
    for i in range(n):
        # 마지막 i개는 이미 정렬된 상태이므로 제외
        for j in range(0, n - 1 - i):
            # 인접한 두 원소 비교
            if arr[j] > arr[j + 1]:
                # 위치 교환 (Swap)
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                
    return arr`,
    boilerplate: `def bubble_sort(arr: list[int]) -> list[int]:
    # 왼쪽의 정답 코드를 보며 그대로 따라 작성해보세요.
    pass`,
    testCases: ['arr = [5, 3, 8, 4, 2] => [2, 3, 4, 5, 8]']
  },
  {
    id: 'dfs-recursive',
    title: '깊이 우선 탐색 (DFS)',
    category: '그래프 (Graph)',
    difficulty: Difficulty.MEDIUM,
    description: `그래프의 깊은 부분을 우선적으로 탐색하는 알고리즘입니다. 재귀(Recursion)를 사용하여 구현합니다.`,
    solutionCode: `def dfs(graph: dict, start_node: str, visited: set = None) -> list[str]:
    if visited is None:
        visited = set()
    
    result = []
    
    # 1. 현재 노드 방문 처리
    visited.add(start_node)
    result.append(start_node)

    # 2. 인접 노드 순회
    # graph.get(key, [])를 사용하여 키가 없을 경우 빈 리스트 반환
    for neighbor in graph.get(start_node, []):
        if neighbor not in visited:
            # 방문하지 않은 노드라면 재귀 호출
            result.extend(dfs(graph, neighbor, visited))

    return result`,
    boilerplate: `def dfs(graph: dict, start_node: str, visited: set = None) -> list[str]:
    # 왼쪽의 정답 코드를 보며 그대로 따라 작성해보세요.
    pass`,
    testCases: ['graph = {"A":["B","C"], "B":["D"], "C":["E"]}, start = "A" => ["A", "B", "D", "C", "E"]']
  },
  {
    id: 'bfs-iterative',
    title: '너비 우선 탐색 (BFS)',
    category: '그래프 (Graph)',
    difficulty: Difficulty.MEDIUM,
    description: `가까운 노드부터 탐색하는 알고리즘입니다. 큐(Queue/Deque)를 사용하여 레벨 단위로 탐색합니다.`,
    solutionCode: `from collections import deque

def bfs(graph: dict, start_node: str) -> list[str]:
    visited = set()
    queue = deque([start_node])
    
    visited.add(start_node)
    result = []

    while queue:
        # 큐의 앞에서 노드를 꺼냄 (FIFO)
        node = queue.popleft()
        result.append(node)

        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result`,
    boilerplate: `from collections import deque

def bfs(graph: dict, start_node: str) -> list[str]:
    # 왼쪽의 정답 코드를 보며 그대로 따라 작성해보세요.
    pass`,
    testCases: ['graph = {"A":["B","C"], "B":["D"], "C":["E"]}, start = "A" => ["A", "B", "C", "D", "E"]']
  },
  {
    id: 'merge-sort',
    title: '병합 정렬 (Merge Sort)',
    category: '정렬 (Sorting)',
    difficulty: Difficulty.MEDIUM,
    description: `리스트를 반으로 나누고(Divide), 정렬 후 병합(Conquer)하는 분할 정복 알고리즘입니다.`,
    solutionCode: `def merge_sort(arr: list[int]) -> list[int]:
    # Base case: 원소가 1개 이하면 이미 정렬됨
    if len(arr) <= 1:
        return arr

    # 분할 (Divide)
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    # 병합 (Merge)
    return merge(left, right)

def merge(left: list[int], right: list[int]) -> list[int]:
    result = []
    l = r = 0

    # 두 리스트를 비교하며 병합
    while l < len(left) and r < len(right):
        if left[l] < right[r]:
            result.append(left[l])
            l += 1
        else:
            result.append(right[r])
            r += 1
    
    # 남은 요소들 추가
    result.extend(left[l:])
    result.extend(right[r:])
    
    return result`,
    boilerplate: `def merge_sort(arr: list[int]) -> list[int]:
    # 왼쪽의 정답 코드를 보며 그대로 따라 작성해보세요.
    pass

def merge(left: list[int], right: list[int]) -> list[int]:
    pass`,
    testCases: ['arr = [38, 27, 43, 3, 9, 82, 10] => [3, 9, 10, 27, 38, 43, 82]']
  },
  {
    id: 'fibonacci-dp',
    title: '피보나치 수열 (Fibonacci)',
    category: '동적계획법 (DP)',
    difficulty: Difficulty.EASY,
    description: `이전 두 수의 합이 다음 수가 되는 수열입니다. 반복문을 사용하여 효율적으로 계산하는 방법을 연습합니다.`,
    solutionCode: `def fibonacci(n: int) -> int:
    if n <= 1:
        return n
        
    # 두 변수만 사용하여 공간 복잡도 O(1)로 최적화
    a, b = 0, 1
    
    for _ in range(2, n + 1):
        # a는 이전 값, b는 현재 값
        a, b = b, a + b
        
    return b`,
    boilerplate: `def fibonacci(n: int) -> int:
    # 왼쪽의 정답 코드를 보며 그대로 따라 작성해보세요.
    pass`,
    testCases: ['n = 10 => 55', 'n = 5 => 5']
  }
];