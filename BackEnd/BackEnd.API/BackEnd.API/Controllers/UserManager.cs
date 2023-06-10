using System;
using System.IO;
using System.IO.Compression;
using System.Text;

public class UserManager
{
    private const string UserInfoFolder = "UserInfo";

    public void CreateUser(string username, string password)
    {
        // Verificar si la carpeta UserInfo existe, si no, crearla
        if (!Directory.Exists(UserInfoFolder))
        {
            Directory.CreateDirectory(UserInfoFolder);
        }

        // Comprimir la contraseña utilizando el algoritmo Huffman
        byte[] compressedPassword = CompressString(password);

        // Crear un archivo con el nombre de usuario en la carpeta UserInfo y guardar la contraseña comprimida
        string filePath = Path.Combine(UserInfoFolder, $"{username}.txt");
        File.WriteAllBytes(filePath, compressedPassword);
        Console.WriteLine($"Usuario '{username}' creado exitosamente.");
    }

    public bool ValidateUser(string username, string password)
    {
        // Verificar si la carpeta UserInfo existe
        if (!Directory.Exists(UserInfoFolder))
        {
            Console.WriteLine("La carpeta UserInfo no existe.");
            return false;
        }

        // Verificar si el archivo del usuario existe
        string filePath = Path.Combine(UserInfoFolder, $"{username}.txt");
        if (!File.Exists(filePath))
        {
            Console.WriteLine($"El usuario '{username}' no existe.");
            return false;
        }

        // Leer el archivo y descomprimir la contraseña
        byte[] compressedPassword = File.ReadAllBytes(filePath);
        string decompressedPassword = DecompressString(compressedPassword);

        // Comparar la contraseña descomprimida con la recibida
        bool passwordMatch = string.Equals(decompressedPassword, password, StringComparison.OrdinalIgnoreCase);

        if (passwordMatch)
        {
            Console.WriteLine("La contraseña es válida.");
        }
        else
        {
            Console.WriteLine("La contraseña no es válida.");
        }

        return passwordMatch;
    }

    private byte[] CompressString(string input)
    {
        byte[] inputData = Encoding.UTF8.GetBytes(input);

        using (MemoryStream outputStream = new MemoryStream())
        {
            using (GZipStream compressionStream = new GZipStream(outputStream, CompressionMode.Compress))
            {
                compressionStream.Write(inputData, 0, inputData.Length);
            }

            return outputStream.ToArray();
        }
    }

    private string DecompressString(byte[] input)
    {
        using (MemoryStream inputStream = new MemoryStream(input))
        {
            using (MemoryStream outputStream = new MemoryStream())
            {
                using (GZipStream decompressionStream = new GZipStream(inputStream, CompressionMode.Decompress))
                {
                    decompressionStream.CopyTo(outputStream);
                }

                byte[] decompressedData = outputStream.ToArray();
                return Encoding.UTF8.GetString(decompressedData);
            }
        }
    }
}
