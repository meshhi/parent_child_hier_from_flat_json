export const utils = {
    generateTree(data, id, pId) {
        const resultTree = {};
        // добавляем корневые узлы
        for (let item of data) {
            item.children = [];
            if (!item[pId]) {
                resultTree[item[id]] = item;
            }
        }

        // заполняем детей корневых узлов и для каждого запускаем рекурсивное построение дерева
        const generateNodeTreeRecursive = (itemForIdentify) => {
            data.forEach(item => {
                if (item[pId] == itemForIdentify[id]) {
                    itemForIdentify.children.push(item);
                    if (!itemForIdentify.node) return;
                    generateNodeTreeRecursive(item);
                }
            })
        }
        for (let key in resultTree) {
            data.forEach(item => {
                if (item[pId] == key) {
                    resultTree[key].children.push(item);
                    generateNodeTreeRecursive(item);
                }
            })
        }

        // приводим итог к массиву из деревьев
        const resultArray = [];
        for (let key in resultTree) {
            resultArray.push(resultTree[key])
        }
        return resultArray;
    },
    recursiveSortTree: (tree, comparator) => {
        tree.sort((prev, next) => comparator(prev.sorthead, next.sorthead));
        tree.forEach(item => {
            if (item.children.length > 0) {
                utils.recursiveSortTree(item.children, comparator);
            }
        })
    },
    sortComparators: {
        increase: (first, second) => {
            return first - second;
        },
        decrease: (first, second) => {
            return second - first;
        }   
    }
}