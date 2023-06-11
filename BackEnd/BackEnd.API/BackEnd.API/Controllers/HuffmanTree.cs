using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
#pragma warning disable CS8601
#pragma warning disable CS8618
public class HuffmanTree
{
    private List<Node> nodes = new List<Node>();
    
    /* `public Node Root { get; set; }` is a property of the `HuffmanTree` class that allows access to
    the root node of the Huffman tree. The `get` accessor retrieves the value of the `Root`
    property, and the `set` accessor sets the value of the `Root` property. This property is used to
    access the root node of the Huffman tree from outside the class, for example, to encode or
    decode a message using the Huffman tree. */
    public Node Root { get; set; }
    public Dictionary<char, int> Frequencies = new Dictionary<char, int>();

    /* This code is building a Huffman tree from a given source string. It first calculates the
    frequency of each character in the string and creates a list of nodes, where each node
    represents a character and its frequency. Then, it repeatedly combines the two nodes with the
    lowest frequency into a parent node until there is only one node left, which becomes the root of
    the Huffman tree. The resulting Huffman tree can be used for data compression and decompression. */
    public void Build(string source)
    {
        for (int i = 0; i < source.Length; i++)
        {
            if (!Frequencies.ContainsKey(source[i]))
            {
                Frequencies.Add(source[i], 0);
            }

            Frequencies[source[i]]++;
        }

        foreach (KeyValuePair<char, int> symbol in Frequencies)
        {
            nodes.Add(new Node() { Symbol = symbol.Key, Frequency = symbol.Value });
        }

        while (nodes.Count > 1)
        {
            List<Node> orderedNodes = nodes.OrderBy(node => node.Frequency).ToList<Node>();

            if (orderedNodes.Count >= 2)
            {
                // Take first two items
                List<Node> taken = orderedNodes.Take(2).ToList<Node>();

                // Create a parent node by combining the frequencies
                Node parent = new Node()
                {
                    Symbol = '*',
                    Frequency = taken[0].Frequency + taken[1].Frequency,
                    Left = taken[0],
                    Right = taken[1]
                };

                nodes.Remove(taken[0]);
                nodes.Remove(taken[1]);
                nodes.Add(parent);
            }

            this.Root = nodes.FirstOrDefault();

        }

    }

    /* This is the `Encode` method of the `HuffmanTree` class. It takes a string `source` as input,
    which represents the message to be encoded, and uses the Huffman tree to encode it into a
    `BitArray`. */
    public BitArray Encode(string source)
    {
        List<bool> encodedSource = new List<bool>();

        for (int i = 0; i < source.Length; i++)
        {
            List<bool> encodedSymbol = this.Root.Traverse(source[i], new List<bool>());
            encodedSource.AddRange(encodedSymbol);
        }

        BitArray bits = new BitArray(encodedSource.ToArray());

        return bits;
    }

    /* This is the `Decode` method of the `HuffmanTree` class. It takes a `BitArray` as input, which
    represents the encoded message, and uses the Huffman tree to decode it and return the original
    message as a string. */
    public string Decode(BitArray bits)
    {
        Node current = this.Root;
        string decoded = "";

        foreach (bool bit in bits)
        {
            if (bit)
            {
                if (current.Right != null)
                {
                    current = current.Right;
                }
            }
            else
            {
                if (current.Left != null)
                {
                    current = current.Left;
                }
            }

            if (IsLeaf(current))
            {
                decoded += current.Symbol;
                current = this.Root;
            }
        }

        return decoded;
    }


    /* The `IsLeaf` function checks if a given node in the Huffman tree is a leaf node or not. A leaf
    node is a node that does not have any child nodes (i.e., it has no left or right child). The
    function returns `true` if the given node is a leaf node, and `false` otherwise. */
    public bool IsLeaf(Node node)
    {
        return (node.Left == null && node.Right == null);
    }

}