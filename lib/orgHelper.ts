import { type RoleInput } from '../app/(story)/organizations/add-organization/OrganizationForm';

export const convertToHierarchy = (
  allNodes: RoleInput[]
): RoleInput & { children?: RoleInput[] } => {
  const nodeMap = new Map<string, RoleInput & { children?: RoleInput[] }>();

  // Initialize all nodes with their titles and empty children array
  allNodes.forEach((node) => {
    nodeMap.set(node.title, { ...node, children: [] });
  });

  let rootNode: (RoleInput & { children?: RoleInput[] }) | undefined;

  // Build the hierarchy
  allNodes.forEach((node) => {
    if (node.superiorTitle !== undefined) {
      const superiorNode = nodeMap.get(node.superiorTitle);
      if (superiorNode !== undefined) {
        superiorNode.children = superiorNode.children ?? [];
        const currentNode = nodeMap.get(node.title);
        if (currentNode !== undefined) {
          superiorNode.children.push(currentNode);
        }
      }
    } else {
      rootNode = nodeMap.get(node.title);
    }
  });

  if (rootNode === undefined) {
    throw new Error('No root node found');
  }

  return rootNode;
};
