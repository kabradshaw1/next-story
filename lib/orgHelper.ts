import { type OrganizationQuery } from '@/generated/graphql';

import { type RoleInput } from '../app/(story)/organizations/add/RoleForm';

type Role = NonNullable<
  NonNullable<OrganizationQuery['organization']>['roles']
>[number];

export const convertToHierarchy = (
  allNodes: RoleInput[]
): RoleInput & { children?: RoleInput[] } => {
  const nodeMap = new Map<string, RoleInput & { children?: RoleInput[] }>();

  // Initialize all nodes with their titles and empty children array
  allNodes.forEach((node) => {
    nodeMap.set(node.roleTitle, { ...node, children: [] });
  });

  let rootNode: (RoleInput & { children?: RoleInput[] }) | undefined;

  // Build the hierarchy
  allNodes.forEach((node) => {
    if (node.superiorTitle !== undefined && node.superiorTitle !== '') {
      const superiorNode = nodeMap.get(node.superiorTitle);
      if (superiorNode !== undefined) {
        superiorNode.children = superiorNode.children ?? [];
        const currentNode = nodeMap.get(node.roleTitle);
        if (currentNode !== undefined) {
          superiorNode.children.push(currentNode);
        }
      }
    } else {
      if (rootNode === undefined) {
        rootNode = nodeMap.get(node.roleTitle);
      } else {
        // Multiple root nodes case: attach to a virtual root
        const currentNode = nodeMap.get(node.roleTitle);
        if (currentNode !== undefined) {
          if (rootNode.children === undefined) {
            rootNode.children = [];
          }
          rootNode.children.push(currentNode);
        }
      }
    }
  });

  // If no rootNode found, create a virtual root node
  if (rootNode === undefined && allNodes.length > 0) {
    rootNode = { ...allNodes[0], children: [] };
    nodeMap.forEach((node) => {
      if (node !== rootNode) {
        rootNode?.children?.push(node);
      }
    });
  }

  if (rootNode === undefined) {
    throw new Error('Root node not found');
  }

  return rootNode;
};

export const transformRoles = (
  roles: Role[] | null | undefined
): RoleInput[] => {
  if (roles === null || roles === undefined) {
    return [];
  }
  return roles.map((role) => ({
    roleTitle: role?.title ?? '',
    text: role?.text ?? '',
    superiorTitle: role?.superior?.title ?? undefined,
  }));
};
