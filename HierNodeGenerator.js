export class HierNodeGenerator {
    rootNode = undefined;
    hierarchyContainer = undefined;
    nodeHandlers = [];

    constructor(data, rootNode) {
        this.rootNode = rootNode;
        this.addHierarchyContainer(this.rootNode);
        this.generateHierarchyStructure(this.hierarchyContainer, data);
        this.closeAllNodes();
        this.nodeHandlers.push(this.nodeOpenHandler);
        this.registerNodeListeners();
    }

    addHierarchyContainer(node) {
        this.hierarchyContainer = document.createElement("div");
        this.hierarchyContainer.classList.add("hierarchy-container");
        node.appendChild(this.hierarchyContainer);
    }

    createHierarchyElement(item) {
        const hierarchyElement = document.createElement("div");
        hierarchyElement.classList.add("hierarchy-element");
        hierarchyElement.id = item.id;
        hierarchyElement.innerHTML = item.name + " " + item.price;
        item.node ? hierarchyElement.classList.add("node") : hierarchyElement.classList.add("leaf")
        return hierarchyElement;
    }

    generateHierarchyStructure(node, tree) {
        tree.forEach(item => {
            const hierarchyElement = this.createHierarchyElement(item);
            node.appendChild(hierarchyElement);
            if (item.children.length) {
                this.generateHierarchyStructure(hierarchyElement, item.children)
            }
        })
    }

    closeAllNodes() {
        (this.hierarchyContainer.querySelectorAll('.node > div')).forEach(node => node.classList.add("invisible"));
    }

    nodeOpenHandler(e) {
        e.stopPropagation();
        e.target.childNodes.forEach(node => {
            node?.classList?.toggle("invisible");
        });
    }

    registerNodeListeners() {
        (this.hierarchyContainer.querySelectorAll('.node')).forEach(node => {
            this.nodeHandlers.forEach(nodeHandler => node.addEventListener("click", nodeHandler));
        });
    }
}