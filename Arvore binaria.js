TreeJs = (function(){
    
    function Node(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
    
    function Tree() {
        parent = null;
        this.getp = function () { return parent;}

        this.addNode = function (node, pai, side) {
            if (parent == null) {
                parent = node;
                return parent;
            }
            if (typeof (pai) === "undefined" || typeof (side) === "undefined") {
                return null;
            }
            pai[side] = node;
            return node
        }
        this.addNewNode = function (value, pai, side) {
            var node = new Node(value);
            return this.addNode(node, pai, side);
        }
        this.getNode = function (value) {
            return this.searchNode(parent, value)
        }

        this.searchNode = function (node, value) {
            if (node == null) {
                return null;
            }
            if (node.value === value) {
                return node;
            }
            var left = this.searchNode(node.left, value)
            if (left != null && left.value === value) {
                return left;
            }
            var right = this.searchNode(node.right, value)
            if (right != null && right.value === value) {
                return right;
            }           
            return null;
        }
    }
    
    return {
        newNode: function () {
            return new Node()
        },
        newTree: function () {
            return new Tree()
        }
    }

})();