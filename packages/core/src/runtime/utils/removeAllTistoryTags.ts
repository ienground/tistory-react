/**
 * React가 해당 DOM을 소유하기 전에 Tistory wrapper를 제거한다.
 *
 * 이 함수는 React root를 생성하거나 hydration하기 전에만 호출해야 한다.
 * React가 관리하는 subtree에서 호출하면 reconciler가 추적하는 노드를
 * 외부에서 변경하게 되므로 화면 전환 시 DOM 예외가 발생할 수 있다.
 */
export const removeAllTistoryTags = (scope: ParentNode = document) => {
  const tistoryElements = scope.querySelectorAll<HTMLElement>(
    '[data-is-tistory-tag]',
  );

  tistoryElements.forEach(element => {
    element.replaceWith(...Array.from(element.childNodes));
  });
};

/**
 * @deprecated React effect에서 DOM을 변경하지 않도록 더 이상 동작하지 않는다.
 * 태그 제거가 필요하면 root 생성 전에 removeAllTistoryTags를 호출한다.
 */
export const useRemoveTistoryTags = () => {};
