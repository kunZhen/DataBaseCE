using System;
using System.Collections.Generic;
using System.IO;
using System.Xml;

public class XmlManager
{
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

    public List<List<string>> LeerXml(string Nombre)
    {
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
    
        XmlDocument xmlDoc = new XmlDocument();
        xmlDoc.Load(rutaXml);
    
        XmlNode raizNode = xmlDoc.DocumentElement;
    
        List<List<string>> datos = new List<List<string>>();
    
        // Obtener los atributos
        List<string> atributos = new List<string>();
        foreach (XmlNode nodo in raizNode.SelectNodes("Atributo"))
        {
            string atributo = nodo.Attributes["Atributo"].Value;
            atributos.Add(atributo);
        }
        datos.Add(atributos);
    
        // Obtener las instancias
        foreach (XmlNode nodo in raizNode.SelectNodes("Instancia"))
        {
            List<string> instancia = new List<string>();
            foreach (XmlAttribute atributo in nodo.Attributes)
            {
                string nombreAtributo = atributo.Name;
                string valorAtributo = atributo.Value;
                instancia.Add($"{nombreAtributo}:{valorAtributo}");
            }
            datos.Add(instancia);
        }
    
        return datos;
    }

    public List<Dictionary<string, string>> SelectFromXml(string nombreXml, string selectFrom, string where)
{
    string rutaCarpeta = Path.Combine(Environment.CurrentDirectory, nombreXml);
    string rutaXml = Path.Combine(rutaCarpeta, nombreXml + ".xml");

    // Comprobar si la carpeta y el archivo XML existen
    if (!Directory.Exists(rutaCarpeta))
    {
        Console.WriteLine($"La carpeta '{nombreXml}' no existe.");
        return null;
    }
    if (!File.Exists(rutaXml))
    {
        Console.WriteLine($"El archivo XML '{nombreXml}.xml' no existe en la carpeta '{nombreXml}'.");
        return null;
    }

    XmlDocument xmlDoc = new XmlDocument();
    xmlDoc.Load(rutaXml);

    string xpathQuery = $"//Instancia[{where}]";
    XmlNodeList selectedNodes = xmlDoc.SelectNodes(xpathQuery);

    List<Dictionary<string, string>> resultados = new List<Dictionary<string, string>>();

    foreach (XmlNode node in selectedNodes)
    {
        Dictionary<string, string> instancia = new Dictionary<string, string>();

        string[] atributos = selectFrom.Split(',');

        foreach (string atributo in atributos)
        {
            string nombreAtributo = atributo.Trim();

            if (node.Attributes[nombreAtributo] != null)
            {
                string valorAtributo = node.Attributes[nombreAtributo].Value;
                instancia.Add(nombreAtributo, valorAtributo);
            }
        }

        resultados.Add(instancia);
    }

    return resultados;
}



}
