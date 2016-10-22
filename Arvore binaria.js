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
            if (parent == null) {
                parent = node;
                return parent;
            }
            if (typeof (pai) === "undefined" || typeof (side) === "undefined") {
                return null;
            }
            if (typeof (pai) == "number") {
                pai = this.getNode(pai)
            }
            pai[side] = node;
            return node
        }
        this.addNewNode = function (value, pai, side) {
            if (typeof (pai) == "number") {
                pai = this.getNode(pai)
            }
            var node = new Node(value);
            return this.addNode(node, pai, side);
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
