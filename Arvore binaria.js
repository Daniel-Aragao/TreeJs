TreeJs = (function(){
    
    function Node(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
    
    function Tree() {
        parent = null;
        this.getRoot = function () { return parent;}

        this.addNode = function (node, pai, side) {
            if (!(node instanceof Node)) {
                node = new Node(node);
            }
            if (parent == null) {
                parent = node;
                return parent;
            }
            if (typeof (pai) === "undefined" || typeof (side) === "undefined") {
                return null;
            }

            if (!(pai instanceof Node)) {
                pai = this.getNode(pai)
            }
            pai[side] = node;
            return node
        }


        this.removeNode = function (node) {
            if (!(node instanceof Node)) {
                node = this.getNode(node)
            }
            pai = this.getNodeParent(node.value)

            if (pai == null) {
                if (node.left == null && node.right == null) {
                } else if (node.left == null) {
                    parent = node.right
                } else if (node.right == null) {
                    parent = node.left;
                } else {
                    parent = node.left
                    this.appendNode(node.left, node.right)
                }
                return;
            }


            if (node.left == null && node.right == null) {
                if (pai.left.value === node.value) {
                    pai.left = null
                } else {
                    pai.right = null;
                }            
            } else if (node.left == null) {
                if (pai.left.value === node.value) {
                    pai.left = node.right
                } else {
                    pai.right = node.right;
                }  
            } else if (node.right == null) {
                if (pai.left.value === node.value) {
                    pai.left = node.left
                } else {
                    pai.right = node.left;
                } 
            } else {
                if (pai.left.value === node.value) {
                    pai.left = node.left
                } else {
                    pai.right = node.left;
                }
                this.appendNode(node.left, node.right)
            }

        }
        this.appendNode = function(root, node){
            if (root.left == null) {
                root.left = node;
                return;
            }
            if (root.right == null) {
                root.right = node
                return;
            }

            this.appendNode(root.left, node);
            return;

        }

        this.getNode = function (value) {
            return searchNode(parent, value)
        }

        var searchNode = function (node, value) {
            if (node == null) {
                return null;
            }
            if (node.value === value) {
                return node;
            }
            var left = searchNode(node.left, value)
            if (left != null && left.value === value) {
                return left;
            }
            var right = searchNode(node.right, value)
            if (right != null && right.value === value) {
                return right;
            }           
            return null;
        }
        this.getNodeParent = function (value) {
            return searchNodeParent(parent, value)
        }

        var searchNodeParent = function (node, value) {
            if (node == null) {
                return null;
            }
            if (node.left != null && node.left.value === value) {
                return node;
            }else if (node.right != null && node.right.value === value) {
                return node;
            }
            left = searchNodeParent(node.left, value)
            if (left != null) {
                return left
            }            
            right = searchNodeParent(node.right, value)
            
            return right;
        }
    }

    function HeapTree() {
        parent = null;

    }

    function buildHTML(node) {
        var ndiv = document.createElement("div");
        ndiv.className += " tree-node "

        var nspan = document.createElement("span");
        nspan.className += " tree-value "

        nspan.innerText = node.value;
        ndiv.appendChild(nspan);

        var cssClass = "node-orientation";

        if (node.left != null) {
            var left_html = buildHTML(node.left);
            left_html.children[0].className += cssClass+"-left"
            left_html.children[0].insertAdjacentHTML("afterend",
                "<span class=\""+cssClass+" "+cssClass+"-left\"> - Left</span>")
            
            ndiv.appendChild(left_html);  
        }

        if (node.right != null) {
            var right_html = buildHTML(node.right);
            right_html.children[0].className += cssClass+"-right"

            right_html.children[0].insertAdjacentHTML("afterend",
                "<span class=\""+cssClass+" "+cssClass+"-right\"> - Right</span>")

            ndiv.appendChild(right_html);
        }
        return ndiv;
    }
    
    return {
        newNode: function () {
            return new Node()
        },
        newTree: function () {
            return new Tree()
        },
        buildHTML: buildHTML
    }

})();
