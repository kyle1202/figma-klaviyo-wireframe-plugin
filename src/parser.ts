src/parser.ts
import { parseDocument } from 'htmlparser2';
import { DomUtils } from 'htmlparser2';

export type Block =
  | { type: 'heading'; content: string }
  | { type: 'paragraph'; content: string }
  | { type: 'image'; src: string }
  | { type: 'button'; content: string };

export function parseToBlocks(html: string): Block[] {
  const doc = parseDocument(html);
  const blocks: Block[] = [];
  const nodes = DomUtils.findAll(node => DomUtils.isTag(node), doc);
  nodes.forEach(node => {
    switch (node.name) {
      case 'h1':
      case 'h2':
      case 'h3':
        blocks.push({ type: 'heading', content: DomUtils.textContent(node) });
        break;
      case 'p':
        blocks.push({ type: 'paragraph', content: DomUtils.textContent(node) });
        break;
      case 'img':
        if (node.attribs && node.attribs.src) blocks.push({ type: 'image', src: node.attribs.src });
        break;
      case 'a':
        blocks.push({ type: 'button', content: DomUtils.textContent(node) });
        break;
    }
  });
  return blocks;
}
