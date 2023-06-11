using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

#pragma warning disable CS8600
#pragma warning disable CS8603
#pragma warning disable CS8618
public class Node
    {
        /* `public char Symbol { get; set; }` is a property of the `Node` class in C#. It is a getter
        and setter for the `Symbol` attribute of a node in a binary tree. It allows access to the
        `Symbol` attribute from outside the class and also allows modification of the `Symbol`
        attribute. */
        public char Symbol { get; set; }
        public int Frequency { get; set; }
        /* `public Node Right { get; set; }` is a property of the `Node` class in C#. It is a getter
        and setter for the `Right` child node of a binary tree. It allows access to the `Right`
        child node from outside the class and also allows modification of the `Right` child node. */
        public Node Right { get; set; }
        /* `public Node Left { get; set; }` is a property of the `Node` class in C#. It is a getter and
        setter for the `Left` child node of a binary tree. It allows access to the `Left` child node
        from outside the class and also allows modification of the `Left` child node. */
        public Node Left { get; set; }


        /* This is a method called `Traverse` in the `Node` class that traverses a binary tree and
        returns a list of boolean values representing the path to a leaf node containing a given
        symbol. */
        public List<bool> Traverse(char symbol, List<bool> data)
        
        {
            // Leaf
            if (Right == null && Left == null)
            {
                if (symbol.Equals(this.Symbol))
                {
                    return data;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                List<bool> left = null;
                List<bool> right = null;

                if (Left != null)
                {
                    List<bool> leftPath = new List<bool>();
                    leftPath.AddRange(data);
                    leftPath.Add(false);

                    left = Left.Traverse(symbol, leftPath);
                }

                if (Right != null)
                {
                    List<bool> rightPath = new List<bool>();
                    rightPath.AddRange(data);
                    rightPath.Add(true);
                    right = Right.Traverse(symbol, rightPath);
                }

                if (left != null)
                {
                    return left;
                }
                else
                {
                    return right;
                }
            }
        }
    }
