import { Undo } from './undo';
import { Redo } from './redo';
import { PadStart } from './pad-start';
import { Enclose } from './enclose';
import { List } from './list';
import { Line } from './line';
import { Preview } from './preview';
import { Link } from './link';

export const builtinTools = new Map()

builtinTools.set('undo', Undo);
builtinTools.set('redo', Redo);
builtinTools.set('h1', new PadStart('H1', '# '));
builtinTools.set('h2', new PadStart('H2', '## '));
builtinTools.set('h3', new PadStart('H3', '### '));
builtinTools.set('h4', new PadStart('H4', '#### '));
builtinTools.set('h5', new PadStart('H5', '##### '));
builtinTools.set('h6', new PadStart('H6', '###### '));
builtinTools.set('bold', new Enclose('粗体', '**', 'bold'));
builtinTools.set('strikethrough', new Enclose('删除线', '~~', 'strikethrough'));
builtinTools.set('italic', new Enclose('斜体', '*', 'italic'));
builtinTools.set('quote', new PadStart('引用', '>', 'quote-left'));
builtinTools.set('ul', new List('无序列表', 'ul'));
builtinTools.set('ol', new List('有序列表', 'ol'));
builtinTools.set('line', Line);
builtinTools.set('link', Link);
builtinTools.set('preview', Preview);
