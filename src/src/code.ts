import { parseToBlocks } from './parser';

figma.showUI(__html__, { width: 360, height: 300 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'render-html') {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
    const blocks = parseToBlocks(msg.html);
    const frame = figma.createFrame();
    frame.layoutMode = 'VERTICAL';
    frame.counterAxisSizingMode = 'AUTO';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.paddingTop = frame.paddingBottom = 16;
    frame.paddingLeft = frame.paddingRight = 16;
    frame.itemSpacing = 16;

    for (const block of blocks) {
      if (block.type === 'heading') {
        const text = figma.createText();
        text.characters = block.content;
        text.fontSize = 24;
        frame.appendChild(text);
      } else if (block.type === 'paragraph') {
        const text = figma.createText();
        text.characters = block.content;
        text.fontSize = 14;
        frame.appendChild(text);
      } else if (block.type === 'image') {
        const rect = figma.createRectangle();
        rect.resize(300, 150);
        frame.appendChild(rect);
      } else if (block.type === 'button') {
        const btn = figma.createRectangle();
        btn.resize(120, 32);
        const txt = figma.createText();
        txt.characters = block.content;
        txt.fontSize = 14;
        btn.appendChild(txt);
        frame.appendChild(btn);
      }
    }

    figma.currentPage.appendChild(frame);
    figma.closePlugin();
  }
};
