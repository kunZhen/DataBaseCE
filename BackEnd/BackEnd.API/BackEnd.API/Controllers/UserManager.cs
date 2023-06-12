using System;
using System.Collections;
using System.IO.Ports;
using System.Text.Json;
#pragma warning disable CS8601
namespace app
{
    public static class UserManager
    {
        /* This code is saving a compressed version of the user's password to a file. */
        public static void SaveCompressedPassword(string username, string password)
        {
            HuffmanTree huffmanTree = new HuffmanTree();
            huffmanTree.Build(password);
            BitArray encoded = huffmanTree.Encode(password);
            byte[] bytes = new byte[encoded.Length / 8 + (encoded.Length % 8 == 0 ? 0 : 1)];
            encoded.CopyTo(bytes, 0);
            Directory.CreateDirectory("UserInfo");
            using (FileStream stream = File.Create(Path.Combine("UserInfo", username)))
            {
                byte[] frequencies = JsonSerializer.SerializeToUtf8Bytes(huffmanTree.Frequencies);
                stream.Write(frequencies);
                stream.WriteByte((byte)'\n');
                byte[] bitArrayLength = JsonSerializer.SerializeToUtf8Bytes(encoded.Length);
                stream.Write(bitArrayLength);
                stream.WriteByte((byte)'\n');
                stream.Write(bytes);
            }
        }


        /* This code is checking if a compressed version of the user's password exists in a file. If
        the file does not exist, it returns false. If the file exists, it reads the file and
        deserializes the Huffman tree frequencies and the length of the encoded BitArray from the
        file. It then builds a new Huffman tree using the user's password and decodes the BitArray
        using the Huffman tree. Finally, it compares the decoded password with the original password
        and returns true if they match, and false otherwise. If the decoded password matches the
        original password, it sends a signal to an Arduino connected to the computer via a serial
        port to indicate that the password was correct. If the decoded password does not match the
        original password, it sends a different signal to the Arduino to indicate that the password
        was incorrect. */
        public static bool CheckCompressedPassword(string username, string password)
        {
            if (!File.Exists(Path.Combine("UserInfo", username)))
                return false;
            HuffmanTree huffmanTree = new HuffmanTree();
            int bitArrayLength;
            byte[] bytes;
            using (FileStream stream = File.OpenRead(Path.Combine("UserInfo", username)))
            {
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    int b;
                    while ((b = stream.ReadByte()) != '\n' && b != -1)
                        memoryStream.WriteByte((byte)b);
                    memoryStream.Position = 0;
                    huffmanTree.Frequencies = JsonSerializer.DeserializeAsync<Dictionary<char, int>>(memoryStream).Result;
                    huffmanTree.Build(password);
                    memoryStream.SetLength(0);
                    while ((b = stream.ReadByte()) != '\n' && b != -1)
                        memoryStream.WriteByte((byte)b);
                    memoryStream.Position = 0;
                    bitArrayLength = JsonSerializer.DeserializeAsync<int>(memoryStream).Result;
                }
                bytes = new byte[stream.Length - stream.Position];
                stream.Read(bytes, 0, bytes.Length);
            }
            BitArray encoded = new BitArray(bytes);
            encoded.Length = bitArrayLength;
            string decoded = huffmanTree.Decode(encoded);
            if (decoded == password)
            {
                // La contraseña coincide
                try
                {
                    // Abre la conexión con el puerto serie del Arduino
                    using (SerialPort arduinoPort = new SerialPort("COM3", 9600))
                    {
                        arduinoPort.Open();

                        // Envía la señal al Arduino
                        arduinoPort.Write("S"); // Puedes enviar cualquier carácter o cadena que desees

                        // Cierra la conexión con el puerto serie del Arduino
                        arduinoPort.Close();
                    }
                }
                catch (Exception ex)
                {
                    // Maneja cualquier excepción que pueda ocurrir al comunicarse con el Arduino
                    Console.WriteLine("Error al enviar la señal al Arduino: " + ex.Message);
                }
                return true;
            }
            else
            {
                // La contraseña no coincide
                try
                {
                    // Abre la conexión con el puerto serie del Arduino
                    using (SerialPort arduinoPort = new SerialPort("COM3", 9600))
                    {
                        arduinoPort.Open();

                        // Envía la señal al Arduino
                        arduinoPort.Write("W"); // Puedes enviar cualquier carácter o cadena que desees

                        // Cierra la conexión con el puerto serie del Arduino
                        arduinoPort.Close();
                    }
                }
                catch (Exception ex)
                {
                    // Maneja cualquier excepción que pueda ocurrir al comunicarse con el Arduino
                    Console.WriteLine("Error al enviar la señal al Arduino: " + ex.Message);
                }

                return false;
            }
        }
    }
}

