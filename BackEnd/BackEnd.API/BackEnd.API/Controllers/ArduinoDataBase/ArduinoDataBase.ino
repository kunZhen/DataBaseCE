const int ledPin1 = 3; // Pin del LED en Arduino
const int ledPin2 = 4; // Pin del LED en Arduino

const int speakerPin = 7; // Pin del parlante en Arduino


void setup() {
  pinMode(ledPin1, OUTPUT); // Configurar el pin del LED como salida
  pinMode(ledPin2, OUTPUT); // Configurar el pin del LED como salida
  pinMode(speakerPin, OUTPUT);
  Serial.begin(9600);      // Iniciar comunicación serial a 9600 baudios
}

void loop() {
  if (Serial.available() > 0) {
    char receivedChar = Serial.read(); // Leer el carácter recibido

    if (receivedChar == 'W') {
      digitalWrite(ledPin1, HIGH); // Encender el LED
      delay(3000);                // Esperar 3 segundos
      digitalWrite(ledPin1, LOW);
    } else if(receivedChar == 'S'){
      tone(speakerPin, 9000); // Hacer sonar el parlante a una frecuencia de 1000 Hz
      delay(3000);
      noTone(speakerPin);     // Detener el sonido del parlante
    } else if(receivedChar == 'D'){
      digitalWrite(ledPin2, HIGH); // Encender el LED
      delay(3000);                // Esperar 3 segundos
      digitalWrite(ledPin2, LOW);
    }
  }
}
