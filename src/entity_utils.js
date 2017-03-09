export function updateText(original, update, start, end) {
  if (typeof update == 'undefined') return original;

  // Обновляем текст целиком
  if (typeof start == 'undefined' && typeof end == 'undefined' || start == null && end == null) {
    return update;

  // Обновляем текст на указанных позициях
  } else {
    const len = original.length;

    if (start > len || end > len) return original;
    if (start == null || end == null) return original;

    const startBefore = 0;
    const endBefore   = start;
    const startAfter  = end;
    const endAfter    = len;

    return [
      original.substr(startBefore, endBefore),
      update,
      original.substr(startAfter, endAfter)
    ].join('')
  }
}
