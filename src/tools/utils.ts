import { Range } from 'codemirror';

export function getSelectedLines(selections: Range[]): number[][] {
  const lines: number[][] = [];

  selections.forEach(s => {
    const head = s.head.line;
    const anchor = s.anchor.line;
    const range = []
    for (let i = Math.min(head, anchor); i <= Math.max(head, anchor); i++) {
      range.push(i)
    }
    lines.push(range)
  })

  return lines;
}
