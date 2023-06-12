using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Ports;
using System.Xml;
using System.Xml.Linq;

#pragma warning disable CS8600
#pragma warning disable CS8602
#pragma warning disable CS8603
#pragma warning disable CS8604

public class XmlManager
{
    /* This code creates a folder and an XML store with a given name and list of attributes. It first
    creates the folder using the `Directory.CreateDirectory` method and then creates the XML store
    using the `XmlWriter.Create` method. It writes the XML declaration and root element using the
    `WriteStartDocument` and `WriteStartElement` methods, respectively. It then iterates over the
    list of attributes and writes each one as a child element of the root element using the
    `WriteStartElement`, `WriteAttributeString`, and `WriteEndElement` methods. Finally, it closes
    the root element and the XML document using the `WriteEndElement` and `WriteEndDocument` methods
    and prints a message indicating that the folder and XML store have been created successfully. */
    public void CrearCarpetaXmlStore(string Nombre, List<string> atributos)
    {
        // Crear la carpeta
        string rutaCarpeta = Path.Combine(Environment.CurrentDirectory, Nombre);
        Directory.CreateDirectory(rutaCarpeta);

        // Crear el XML store
        string rutaXmlStore = Path.Combine(rutaCarpeta, Nombre + ".xml");
        using (XmlWriter writer = XmlWriter.Create(rutaXmlStore))
        {
            writer.WriteStartDocument();
            writer.WriteStartElement(Nombre);

            foreach (string atributo in atributos)
            {
                writer.WriteStartElement("Atributo");
                writer.WriteAttributeString("Atributo", atributo);
                writer.WriteEndElement();
            }

            writer.WriteEndElement();
            writer.WriteEndDocument();
        }

        Console.WriteLine($"Se ha creado la carpeta '{Nombre}' y el XML store '{Nombre}.xml'.");
    }


    /* This is a C# method that adds data to an XML file. It first checks if the XML file exists, and
    if it does, it loads the file and checks if the provided attributes are valid. It then creates a
    new XML element with the provided attributes and appends it to the root element of the XML file.
    Finally, it saves the changes to the XML file and prints a message indicating that the data has
    been added successfully. */
    public void AgregarDatosXml(string Nombre, params string[] atributos)
    {
        string rutaXml = Path.Combine(Nombre, Nombre + ".xml");

        // Comprobar si el archivo XML existe
        if (!File.Exists(rutaXml))
        {
            Console.WriteLine($"El archivo XML '{Nombre}.xml' no existe en la carpeta '{Nombre}'.");
            return;
        }

        XmlDocument xmlDoc = new XmlDocument();
        xmlDoc.Load(rutaXml);

        XmlNode raizNode = xmlDoc.DocumentElement;

        // Obtener la lista de atributos permitidos
        List<string> atributosPermitidos = new List<string>();
        foreach (XmlNode nodo in raizNode.SelectNodes("Atributo"))
        {
            string atributo = nodo.Attributes["Atributo"].Value;
            atributosPermitidos.Add(atributo);
        }

        // Comprobar si los atributos proporcionados son válidos
        foreach (string atributo in atributos)
        {
            string[] datos = atributo.Split(':');
            string nombreAtributo = datos[0];

            if (!atributosPermitidos.Contains(nombreAtributo))
            {
                Console.WriteLine($"El atributo '{nombreAtributo}' no está permitido en el archivo XML '{Nombre}.xml'.");
                return;
            }
        }

        XmlNode instanciaNode = xmlDoc.CreateElement("Instancia");

        for (int i = 0; i < atributos.Length; i++)
        {
            string atributo = atributos[i];

            string[] datos = atributo.Split(':');

            XmlAttribute xmlAttribute = xmlDoc.CreateAttribute(datos[0]);
            xmlAttribute.Value = datos[1];
            instanciaNode.Attributes.Append(xmlAttribute);
        }

        raizNode.AppendChild(instanciaNode);

        xmlDoc.Save(rutaXml);

        Console.WriteLine("Se han agregado los datos al archivo XML correctamente.");
    }

    /* The code is defining a method that queries an XML file based on a given set of attributes and a
    where condition. It first checks if the specified folder and XML file exist, then loads the XML
    file using XDocument. It then parses the selectAttributesStr and whereCondition parameters using
    an ExpressionParser class. It queries the XML data using LINQ and the whereFunc expression, and
    creates a list of lists containing the selected attributes for each matching element. The
    resulting list is returned. */
    public List<List<string>> SelectFromXml(string Nombre, string selectAttributesStr, string whereCondition)
    {
        // Split the selectAttributesStr into an array of strings
        string[] selectAttributes = selectAttributesStr.Split(',').Select(s => s.Trim()).ToArray();

        string rutaCarpeta = Path.Combine(Environment.CurrentDirectory, Nombre);
        string rutaXml = Path.Combine(rutaCarpeta, Nombre + ".xml");

        // Comprobar si la carpeta y el archivo XML existen
        if (!Directory.Exists(rutaCarpeta))
        {
            Console.WriteLine($"La carpeta '{Nombre}' no existe.");
            return null;
        }
        if (!File.Exists(rutaXml))
        {
            Console.WriteLine($"El archivo XML '{Nombre}.xml' no existe en la carpeta '{Nombre}'.");
            return null;
        }
        // Load the XML file
        XDocument doc = XDocument.Load(rutaXml);

        // Select all attributes if selectAttributesStr is equal to "*"
        if (selectAttributesStr == "*")
        {
            var firstElement = doc.Descendants("Instancia").FirstOrDefault();
            if (firstElement != null)
            {
                selectAttributes = firstElement.Attributes().Select(a => a.Name.LocalName).ToArray();
            }
        }

        // Parse the where condition
        ExpressionParser parser = new ExpressionParser();

        Func<XElement, bool> whereFunc;

        if (whereCondition == "*")
        {
            whereFunc = element => true;
        }
        else
        {
            Expression expression = parser.Parse(whereCondition);
            whereFunc = element =>
            {
                Dictionary<string, object> variables = new Dictionary<string, object>();
                foreach (XAttribute attribute in element.Attributes())
                {
                    string variableName = $"{Nombre}.{attribute.Name}";
                    variables[variableName] = attribute.Value.Trim();
                    variables[attribute.Name.ToString()] = attribute.Value.Trim();
                }
                return (bool)expression.Evaluate(variables);
            };
        }

        // Query the XML data
        var query = from element in doc.Descendants("Instancia")
                    where whereFunc(element)
                    select element;

        // Create the result list
        List<List<string>> result = new List<List<string>>();

        // Add the header row with the attribute names
        result.Add(selectAttributes.ToList());

        foreach (var element in query)
        {
            List<string> instance = new List<string>();
            foreach (string attribute in selectAttributes)
            {
                instance.Add(element.Attribute(attribute).Value);
            }
            result.Add(instance);
        }

        return result;
    }

    /* The above code is a C# method that takes in three string parameters: xmlNamesStr,
    selectAttributesStr, and joinConditionsStr. It splits the xmlNamesStr and selectAttributesStr
    into arrays of strings, loads the XML files specified in xmlNamesStr, parses the join conditions
    specified in joinConditionsStr using an ExpressionParser, and queries the XML data using LINQ to
    XML. The result is a list of lists of strings, where each inner list represents an instance of
    the joined XML data and contains the selected attributes specified in selectAttributesStr. */
    public List<List<string>> SelectFromXmlJoinAndOr(string xmlNamesStr, string selectAttributesStr, string joinConditionsStr)
    {
        // Split the xmlNamesStr into an array of strings
        string[] xmlNames = xmlNamesStr.Split(',').Select(s => s.Trim()).ToArray();

        // Split the selectAttributesStr into an array of strings
        string[] selectAttributes = selectAttributesStr.Split(',').Select(s => s.Trim()).ToArray();

        // Load the XML files
        XDocument[] docs = new XDocument[xmlNames.Length];
        for (int i = 0; i < xmlNames.Length; i++)
        {
            string rutaCarpeta = Path.Combine(Environment.CurrentDirectory, xmlNames[i]);
            string rutaXml = Path.Combine(rutaCarpeta, xmlNames[i] + ".xml");

            // Comprobar si la carpeta y el archivo XML existen
            if (!Directory.Exists(rutaCarpeta))
            {
                Console.WriteLine($"La carpeta '{xmlNames[i]}' no existe.");
                return null;
            }
            if (!File.Exists(rutaXml))
            {
                Console.WriteLine($"El archivo XML '{xmlNames[i]}.xml' no existe en la carpeta '{xmlNames[i]}'.");
                return null;
            }

            docs[i] = XDocument.Load(rutaXml);
        }

        // Parse the join conditions
        ExpressionParser parser = new ExpressionParser();
        Expression expression = parser.Parse(joinConditionsStr);

        Func<XElement[], bool> joinFunc = elements =>
        {
            Dictionary<string, object> variables = new Dictionary<string, object>();
            foreach (string xmlName in xmlNames)
            {
                int xmlIndex = Array.IndexOf(xmlNames, xmlName);
                foreach (XAttribute attribute in elements[xmlIndex].Attributes())
                {
                    string variableName = $"{xmlName}.{attribute.Name}";
                    variables[variableName] = attribute.Value.Trim();
                }
            }
            return (bool)expression.Evaluate(variables);
        };

        // Query the XML data
        var query = from element0 in docs[0].Descendants("Instancia")
                    from element1 in docs[1].Descendants("Instancia")
                    where joinFunc(new XElement[] { element0, element1 })
                    select new XElement[] { element0, element1 };

        if (docs.Length > 2)
        {
            query = from elements in query
                    from element2 in docs[2].Descendants("Instancia")
                    where joinFunc(new XElement[] { elements[0], elements[1], element2 })
                    select new XElement[] { elements[0], elements[1], element2 };
        }

        // Create the result list
        List<List<string>> result = new List<List<string>>();
        List<string> attributeNames = new List<string>();
        foreach (string attribute in selectAttributes)
        {
            int dotIndex = attribute.IndexOf('.');
            string attributeName = attribute.Substring(dotIndex + 1);
            attributeNames.Add(attributeName);
        }
        result.Add(attributeNames);
        foreach (var elements in query)
        {
            List<string> instance = new List<string>();
            foreach (string attribute in selectAttributes)
            {
                int dotIndex = attribute.IndexOf('.');
                string xmlName = attribute.Substring(0, dotIndex);
                string attributeName = attribute.Substring(dotIndex + 1);

                int xmlIndex = Array.IndexOf(xmlNames, xmlName);

                instance.Add(elements[xmlIndex].Attribute(attributeName).Value);
            }
            result.Add(instance);
        }

        return result;
    }

    public class ExpressionParser
    {

        /* The above code is defining a method that takes a string `str` and returns the result of
        calling another method `ParseOr` with `str` and a reference to an integer variable `index`.
        The purpose of the method is not clear without seeing the implementation of `ParseOr`. */
        public Expression Parse(string str)
        {
            int index = 0;
            return ParseOr(str, ref index);
        }

        /* The above code is a method in C# that is parsing a string expression and creating an
        expression tree for logical OR operations. It first calls another method called ParseAnd to
        parse the left side of the OR operation, and then checks if there are any more OR operations
        in the string. If there are, it calls ParseAnd again to parse the right side of the OR
        operation and creates a new OrExpression node in the expression tree. The method returns the
        final expression tree. */
        private Expression ParseOr(string str, ref int index)
        {
            Expression left = ParseAnd(str, ref index);

            while (index < str.Length)
            {
                char c = str[index];
                if (c == ' ')
                {
                    index++;
                    continue;
                }
                if (c == 'o' && str[index + 1] == 'r')
                {
                    index += 2;
                    Expression right = ParseAnd(str, ref index);
                    left = new OrExpression(left, right);
                }
                else
                {
                    break;
                }
            }

            return left;
        }


        /* The above code is a method in C# that parses a string input representing a logical condition
        and returns an Expression object representing the parsed condition. It uses recursion to
        parse sub-conditions and creates AndExpression objects to combine them using the logical AND
        operator. */
        private Expression ParseAnd(string str, ref int index)
        {
            Expression left = ParseCondition(str, ref index);

            while (index < str.Length)
            {
                char c = str[index];
                if (c == ' ')
                {
                    index++;
                    continue;
                }
                if (c == 'a' && str[index + 1] == 'n' && str[index + 2] == 'd')
                {
                    index += 3;
                    Expression right = ParseCondition(str, ref index);
                    left = new AndExpression(left, right);
                }
                else
                {
                    break;
                }
            }

            return left;
        }


        /* The above code is a method that takes a string and an index as input and returns an
        EqualExpression object. The method searches for the first occurrence of the '=' character in
        the string starting from the given index. It then extracts the substring to the left of the
        '=' character and trims any leading or trailing whitespace. It then searches for the first
        occurrence of a space character after the '=' character and extracts the substring to the
        right of the '=' character and trims any leading or trailing whitespace. Finally, it creates
        and returns an EqualExpression object with the left and right substrings as its properties. */
        private Expression ParseCondition(string str, ref int index)
        {
            int startIndex = index;
            while (index < str.Length && str[index] != '=')
            {
                index++;
            }
            string left = str.Substring(startIndex, index - startIndex).Trim();
            index++;
            startIndex = index;
            while (index < str.Length && str[index] != ' ')
            {
                index++;
            }
            string right = str.Substring(startIndex, index - startIndex).Trim();
            return new EqualExpression(left, right);
        }
    }

    public abstract class Expression
    {
        public abstract object Evaluate(Dictionary<string, object> variables);
    }

    public class OrExpression : Expression
    {
        private Expression left;
        private Expression right;

        /* The above code is defining a constructor for a class in C#. The constructor takes two
        parameters, "left" and "right", and assigns them to the corresponding properties of the
        class. */
        public OrExpression(Expression left, Expression right)
        {
            this.left = left;
            this.right = right;
        }

        /* The above code is implementing a logical OR operation between two boolean expressions
        represented by the left and right operands. It evaluates the left operand first and if it is
        true, it returns true without evaluating the right operand. If the left operand is false, it
        evaluates the right operand and returns its boolean value. The Evaluate method takes a
        dictionary of variables as input and returns the boolean result of the OR operation. */
        public override object Evaluate(Dictionary<string, object> variables)
        {
            return (bool)left.Evaluate(variables) || (bool)right.Evaluate(variables);
        }
    }

    public class AndExpression : Expression
    {
        private Expression left;
        private Expression right;

        /* The above code is defining a constructor for a class in C#. The constructor takes two
        parameters, "left" and "right", and assigns them to the corresponding properties of the
        class. */
        public AndExpression(Expression left, Expression right)
        {
            this.left = left;
            this.right = right;
        }

        /* The above code is implementing a method that evaluates a logical AND operation between two
        expressions (left and right) using a dictionary of variables. It first evaluates the left
        expression and checks if it is true, then it evaluates the right expression and checks if it
        is also true. If both expressions are true, it returns true, otherwise it returns false. */
        public override object Evaluate(Dictionary<string, object> variables)
        {
            return (bool)left.Evaluate(variables) && (bool)right.Evaluate(variables);
        }
    }

    public class EqualExpression : Expression
    {
        private string left;
        private string right;

        /* The above code is defining a constructor for a class in C#. The constructor takes two
        parameters, "left" and "right", and assigns them to the corresponding properties of the
        class. */
        public EqualExpression(string left, string right)
        {
            this.left = left;
            this.right = right;
        }

        /* The above code is a method in C# that checks if two variables are equal. It takes in two
        parameters, "left" and "right", which represent the names of the variables to be compared.
        The method first checks if the "left" variable exists in a dictionary called "variables". If
        it does not exist, the method returns false. If the "left" variable exists, the method
        checks if the "right" variable exists in the "variables" dictionary. If it does, the method
        compares the values of the two variables. If the "right" variable does not exist in the */
        public override object Evaluate(Dictionary<string, object> variables)
        {
            if (!variables.ContainsKey(left))
            {
                // Handle the case where the key does not exist in the dictionary
                return false;
            }

            if (variables.ContainsKey(right))
            {
                return variables[left].Equals(variables[right]);
            }
            else
            {
                return variables[left].Equals(right);
            }
        }
    }


    /* The above code is a C# method that loads an XML file, deletes elements that match certain
    conditions, and returns a table of the remaining elements. The method takes in parameters for
    the name of the XML file, the conditions for deleting elements, and a boolean flag for whether
    to apply the changes to the XML file or just return the modified table. The method uses LINQ to
    XML to parse the XML file and evaluate the delete conditions using an expression parser. It then
    deletes the matching elements and returns a table of the remaining elements, with the header row
    containing the attribute names and the data rows containing */
    public List<List<string>> DeleteFromXml(string xmlName, string deleteConditionsStr, bool applyChanges)
    {
        // Variable to store the table
        List<List<string>> table = new List<List<string>>();

        // Load the XML file
        string rutaCarpeta = Path.Combine(Environment.CurrentDirectory, xmlName);
        string rutaXml = Path.Combine(rutaCarpeta, xmlName + ".xml");

        // Comprobar si la carpeta y el archivo XML existen
        if (!Directory.Exists(rutaCarpeta))
        {
            Console.WriteLine($"La carpeta '{xmlName}' no existe.");
            return table;
        }
        if (!File.Exists(rutaXml))
        {
            Console.WriteLine($"El archivo XML '{xmlName}.xml' no existe en la carpeta '{xmlName}'.");
            return table;
        }

        XDocument doc = XDocument.Load(rutaXml);

        // Create a copy of the XDocument for building the table
        XDocument tableDoc = new XDocument(doc);

        // Check if deleteConditionsStr is equal to "*"
        if (deleteConditionsStr == "*")
        {
            // Delete all instances
            var elementsToDelete = doc.Descendants("Instancia").ToList();
            foreach (var element in elementsToDelete)
            {
                if (applyChanges)
                {
                    element.Remove();
                }
                else
                {
                    tableDoc.Descendants("Instancia").Where(e => XNode.DeepEquals(e, element)).Remove();
                }
            }
        }
        else
        {
            // Parse the delete conditions
            ExpressionParser parser = new ExpressionParser();
            Expression expression = parser.Parse(deleteConditionsStr);

            Func<XElement, bool> deleteFunc = element =>
            {
                Dictionary<string, object> variables = new Dictionary<string, object>();
                foreach (XAttribute attribute in element.Attributes())
                {
                    string variableName = $"{xmlName}.{attribute.Name}";
                    variables[variableName] = attribute.Value.Trim();
                    variables[attribute.Name.ToString()] = attribute.Value.Trim();
                }
                return (bool)expression.Evaluate(variables);
            };

            // Delete the matching elements
            var elementsToDelete = doc.Descendants("Instancia").Where(deleteFunc).ToList();

            // Send signal to Arduino if more than one instance is being deleted
            if (elementsToDelete.Count > 1)
            {
                Console.WriteLine("Peligro");
                try
                {
                    // Abre la conexión con el puerto serie del Arduino
                    using (SerialPort arduinoPort = new SerialPort("COM3", 9600))
                    {
                        arduinoPort.Open();

                        // Envía la señal al Arduino
                        arduinoPort.Write("D"); // Puedes enviar cualquier carácter o cadena que desees

                        // Cierra la conexión con el puerto serie del Arduino
                        arduinoPort.Close();
                    }
                }
                catch (Exception ex)
                {
                    // Maneja cualquier excepción que pueda ocurrir al comunicarse con el Arduino
                    Console.WriteLine("Error al enviar la señal al Arduino: " + ex.Message);
                }
            }

            foreach (var element in elementsToDelete)
            {
                if (applyChanges)
                {
                    element.Remove();
                }
                else
                {
                    tableDoc.Descendants("Instancia").Where(e => XNode.DeepEquals(e, element)).Remove();
                }
            }
        }

        // Save the modified XML file if applyChanges is true
        if (applyChanges)
        {
            doc.Save(rutaXml);
        }

        // Add the header row to the table
        var firstElement = tableDoc.Descendants("Instancia").FirstOrDefault();
        if (firstElement != null)
        {
            table.Add(firstElement.Attributes().Select(a => a.Name.LocalName).ToList());
        }

        // Add the data rows to the table
        foreach (var element in tableDoc.Descendants("Instancia"))
        {
            table.Add(element.Attributes().Select(a => a.Value).ToList());
        }

        // Return the table
        return table;
    }

    /* The above code is a C# method that updates an XML file based on specified conditions and
    attributes, and returns a table of the updated data. It loads an XML file, parses update
    conditions and attributes, and updates matching elements in the XML file. If applyChanges is
    false, it creates a copy of the XML file and updates the copy instead. It then creates a table
    of the updated data, with the header row containing the attribute names and the data rows
    containing the attribute values. The table is returned as a List of Lists of strings. */
    public List<List<string>> UpdateXml(string xmlName, string updateAttributesStr, string updateConditionsStr, bool applyChanges)
    {
        // Variable to store the table
        List<List<string>> table = new List<List<string>>();

        // Load the XML file
        string rutaCarpeta = Path.Combine(Environment.CurrentDirectory, xmlName);
        string rutaXml = Path.Combine(rutaCarpeta, xmlName + ".xml");

        // Comprobar si la carpeta y el archivo XML existen
        if (!Directory.Exists(rutaCarpeta))
        {
            Console.WriteLine($"La carpeta '{xmlName}' no existe.");
            return table;
        }
        if (!File.Exists(rutaXml))
        {
            Console.WriteLine($"El archivo XML '{xmlName}.xml' no existe en la carpeta '{xmlName}'.");
            return table;
        }

        XDocument doc = XDocument.Load(rutaXml);

        // Create a copy of the XDocument for building the table
        XDocument tableDoc = new XDocument(doc);

        // Parse the update conditions
        ExpressionParser parser = new ExpressionParser();
        Expression expression = parser.Parse(updateConditionsStr);

        Func<XElement, bool> updateFunc = element =>
        {
            Dictionary<string, object> variables = new Dictionary<string, object>();
            foreach (XAttribute attribute in element.Attributes())
            {
                string variableName = $"{xmlName}.{attribute.Name}";
                variables[variableName] = attribute.Value.Trim();
                variables[attribute.Name.ToString()] = attribute.Value.Trim();
            }
            return (bool)expression.Evaluate(variables);
        };

        // Parse the update attributes
        var updateAttributes = updateAttributesStr.Split(',')
                                                 .Select(s => s.Split('='))
                                                 .ToDictionary(a => a[0].Trim(), a => a[1].Trim());

        // Update the matching elements
        var elementsToUpdate = doc.Descendants("Instancia").Where(updateFunc).ToList();
        foreach (var element in elementsToUpdate)
        {
            if (applyChanges)
            {
                foreach (var attribute in updateAttributes)
                {
                    element.SetAttributeValue(attribute.Key, attribute.Value);
                }
            }
            else
            {
                var tableElement = tableDoc.Descendants("Instancia").Where(e => XNode.DeepEquals(e, element)).FirstOrDefault();
                if (tableElement != null)
                {
                    foreach (var attribute in updateAttributes)
                    {
                        tableElement.SetAttributeValue(attribute.Key, attribute.Value);
                    }
                }
            }
        }

        // Save the modified XML file if applyChanges is true
        if (applyChanges)
        {
            doc.Save(rutaXml);
        }

        // Add the header row to the table
        var firstElement = tableDoc.Descendants("Instancia").FirstOrDefault();
        if (firstElement != null)
        {
            table.Add(firstElement.Attributes().Select(a => a.Name.LocalName).ToList());
        }

        // Add the data rows to the table
        foreach (var element in tableDoc.Descendants("Instancia"))
        {
            table.Add(element.Attributes().Select(a => a.Value).ToList());
        }

        // Return the table
        return table;
    }

}
