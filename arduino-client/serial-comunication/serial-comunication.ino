// Pines del LED y potenciómetro
int LED1 = 10;
int POTEN = A1;
int potValue;
int dimmer;

// Pin del botón
int buttonPin = 6;
int buttonRead;

void setup() {
  // Configuración del código original
  pinMode(LED1, OUTPUT);
  pinMode(POTEN, INPUT);
  
  // Configuración del botón
  pinMode(buttonPin, INPUT);
  
  Serial.begin(9600);
}

void loop() {
  // ========== LECTURA DEL POTENCIÓMETRO ==========
  potValue = analogRead(POTEN);
  dimmer = map(potValue, 0, 1023, 0, 255);
  
  // ========== LECTURA DEL BOTÓN ==========
  buttonRead = digitalRead(buttonPin);
  
  // ========== ENVÍO DE DATOS AL SERIAL ==========
  // Envía tanto el potenciómetro como el estado del botón en formato JSON
  String jsonString = "{\"potValue\":" + String(dimmer) + 
                      ",\"buttonState\":" + String(buttonRead) + "}";
  Serial.println(jsonString);
  
  // ========== RECEPCIÓN DE COMANDOS DESDE SERIAL ==========
  if (Serial.available() > 0) {
    String message = Serial.readStringUntil('\n');
    message.trim();
    
    if (message.equals("ON")) {
      digitalWrite(LED1, HIGH);
    } else if (message.equals("OFF")) {
      digitalWrite(LED1, LOW);
    }
  }
  
  delay(100);
}