TreeJs = (function(){
    
    function Node(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
    
    function Tree() {
        var parent = null;
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

        this.getAltura = function(value){
            var sum = -1;
            var pai = null;
            do {
                pai = this.getNodeParent(value);
                if(pai != null) value = pai.value;
                sum++;
            } while (pai != null);


            return sum;
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

    /*            HEAP TREE
    i = 1 é a raiz
    -piso de i/2 é o pai de i
    -2i é o filho esquerdo de i
    -2i+1 é o filho direito de i
    -indice 1 não tem pai...
    -i só tem filho direito se (2i + 1) <= n
    -i só tem filho esquerdo se 2i <= n
    -nível de i é o piso de log(i,2)
    -nº de nós em um nível é 2**p e são
        (2**p , (2**p + 1), (2**p + 2), ... , ( 2** (p + 1) - 1))
    -nº total de níveis é 1 + piso de log de n
    -o nº total de nós em um nível (tirando o ultimo) é a
        soma da qtd de nós de todos os outros níveis anteriores + 1        
    -altura de um nó i é o piso de log(n/i)
    */
    function HeapNode(key, value) {
        this.key = key;
        this.value = value;
    }

    function HeapTreeMax() {
        var vetor = []

        this.getVetor = function () {
            return vetor;
        }/*
        this.setVetor = function (novoVetor) {
            vetor = novoVetor;
            this.buildHeap();
        }*/

        this.addNode = function (key,value) {
            item = key;
            if (!(key instanceof HeapNode)) {
                item = new HeapNode(key, value)
            }

            var old = findHeapNode(vetor, item.key);

            if (old == null) {
                vetor.push(item);    
                arienep();
            } else {
                old.value += item.value
                this.buildHeap();
            }
        }

        this.removeFirst = function (item) {
            var firstItem = vetor[0];

            vetor = vetor.slice(1);            
            this.buildHeap();

            return firstItem;
        }

        var peneira = function (i) {
            var j = i;
            var n = vetor.length - 1;
            while ((2 * j + 1) <= n) {
                var f = (2 * j) + 1;
                if (f < n && vetor[f].value < vetor[f + 1].value) {
                    f++;
                }
                if (vetor[j].value >= vetor[f].value) {
                    j = n;
                } else {
                    var t = vetor[j];
                    vetor[j] = vetor[f];
                    vetor[f] = t;
                    j = f;
                }
            }
        }
        this.buildHeap = function () {
            var n = vetor.length;
            for (var i = parseInt(n / 2); i > -1; i--){
                peneira(i);
            }
        }

        var arienep = function () {
            var i = vetor.length - 1;
            while (i >= 1 && vetor[parseInt(i/2)] < vetor[i]){
                var pai = parseInt(i / 2);

                var t = vetor[pai];
                vetor[pai] = vetor[i];
                vetor[i] = t;

                i = pai;
            }
        }
    }

    function findHeapNode(V, key) {
        for (var i = 0; i < V.length; i++){
            if (V[i].key == key) {
                return V[i];
            }
        }
        return null;
    }

    function HeapTreeMin() {
        var vetor = []

        this.getVetor = function () {
            return vetor;
        }
        /*
        this.setVetor = function (novoVetor) {
            vetor = novoVetor;
            this.buildHeap();
        }*/

        this.addNode = function (key,value) {
            item = key;
            if (!(key instanceof HeapNode)) {
                item = new HeapNode(key, value)
            }

            var old = findHeapNode(vetor, item.key);

            if (old == null) {
                vetor.push(item);                
                arienep();
            } else {
                old.value += item.value
                this.buildHeap();
            }

        }

        this.removeFirst = function (item) {
            var firstItem = vetor[0];

            vetor = vetor.slice(1);            
            this.buildHeap();

            return firstItem;
        }

        var peneira = function (i) {
            var j = i;
            var n = vetor.length - 1;
            while ((2 * j + 1) <= n) {
                var f = 2 * j + 1;
                if (f < n && vetor[f].value > vetor[f + 1].value) {
                    f++;
                }
                if (vetor[j].value <= vetor[f].value) {
                    j = n;
                } else {
                    var t = vetor[j];
                    vetor[j] = vetor[f];
                    vetor[f] = t;
                    j = f;
                }
            }
        }
        this.buildHeap = function () {
            var n = vetor.length;
            for (var i = parseInt(n / 2); i > -1; i--){
                peneira(i);
            }
        }

        var arienep = function () {
            var i = vetor.length - 1;
            while (i >= 1 && vetor[parseInt(i/2)].value > vetor[i].value){
                var pai = parseInt(i / 2);

                var t = vetor[pai];
                vetor[pai] = vetor[i];
                vetor[i] = t;

                i = pai;
            }
        }
    }

    function buildHTMLHeap(vetor, i) {
        var ndiv = document.createElement("div");
        ndiv.className += " tree-node "

        var nspan = document.createElement("span");
        nspan.className += " tree-value "

        nspan.innerText = vetor[i].key + ": "+vetor[i].value;
        ndiv.appendChild(nspan);

        var cssClass = "node-orientation";
        
        if (typeof(vetor[2*i + 1]) != "undefined") {
            var left_html = buildHTMLHeap(vetor, 2*i + 1);
            left_html.children[0].className += cssClass+"-left"
            left_html.children[0].insertAdjacentHTML("afterend",
                "<span class=\""+cssClass+" "+cssClass+"-left\"> - Left</span>")
            
            ndiv.appendChild(left_html);  
        }

        if (typeof(vetor[2*i + 2]) != "undefined") {
            var right_html = buildHTMLHeap(vetor, 2*i + 2);
            right_html.children[0].className += cssClass+"-right"

            right_html.children[0].insertAdjacentHTML("afterend",
                "<span class=\""+cssClass+" "+cssClass+"-right\"> - Right</span>")

            ndiv.appendChild(right_html);
        }
        return ndiv;
    }

    function buildHTML(node, i) {
        if (node instanceof HeapTreeMax || node instanceof HeapTreeMin) {
            return buildHTMLHeap(node.getVetor(), i);
        }

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
        newNode: function (value) {
            return new Node(value);
        },
        newTree: function () {
            return new Tree();
        },
        newHeapTreeMax: function () { 
            return new HeapTreeMax();
        },
        newHeapTreeMin: function () { 
            return new HeapTreeMin();
        },
        newHeapNode: function (key, value) {
            return new HeapNode(key, value);
        },
        buildHTML: buildHTML,
        buildHTMLHeap: buildHTMLHeap
    }

})();
