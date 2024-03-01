export const autoScrollFunction = (listElement: any) => {
  if (listElement) {
    const isScrolledToBottom =
      listElement.scrollHeight - listElement.clientHeight <=
      listElement.scrollTop + 1;
    if (!isScrolledToBottom) {
      listElement.scrollTop = listElement.scrollHeight;
    }
  }
};
