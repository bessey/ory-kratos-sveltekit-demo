import type {
	UiNode,
	UiNodeAnchorAttributes,
	UiNodeImageAttributes,
	UiNodeInputAttributes,
	UiNodeScriptAttributes,
	UiNodeTextAttributes
} from '@ory/kratos-client';

export function nodeIsImageType(
	node: UiNode
): node is UiNode & { attributes: UiNodeImageAttributes } {
	return node.type === 'img';
}

export function nodeIsInputType(
	node: UiNode
): node is UiNode & { attributes: UiNodeInputAttributes } {
	return node.type === 'input';
}

export function nodeIsTextType(
	node: UiNode
): node is UiNode & { attributes: UiNodeTextAttributes } {
	return node.type === 'text';
}

export function nodeIsAnchorType(
	node: UiNode
): node is UiNode & { attributes: UiNodeAnchorAttributes } {
	return node.type === 'a';
}

export function nodeIsScriptType(
	node: UiNode
): node is UiNode & { attributes: UiNodeScriptAttributes } {
	return node.type === 'script';
}
