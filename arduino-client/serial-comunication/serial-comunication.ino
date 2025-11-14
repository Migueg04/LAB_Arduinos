// ======== Pines ========
int LED1 = 10;        // LED controlado desde el backend
int POTEN = A1;       // Potenciómetro
int buttonPin = 6;    // Botón físico
int lightPin = A3;    // Fotocelda (LDR)

// ======== Variables ========
int potValue;
int dimmer;
int buttonRead;
int lightVal;
int dt = 100;

void setup() {
  Serial.begin(9600);

  pinMode(LED1, OUTPUT);
  pinMode(POTEN, INPUT);
  pinMode(buttonPin, INPUT);
  pinMode(lightPin, INPUT);
}

void loop() {
  // ======== LECTURAS ========
  potValue = analogRead(POTEN);
  dimmer = map(potValue, 0, 1023, 0, 255);

  buttonRead = digitalRead(buttonPin);
  lightVal = analogRead(lightPin);

  // ======== ENVÍO DE DATOS ========
  // Se envía un solo JSON con todos los valores
  String jsonString = "{\"potValue\":" + String(dimmer) +
                      ",\"buttonState\":" + String(buttonRead) +
                      ",\"lightVal\":" + String(lightVal) + "}";
  Serial.println(jsonString);

  // ======== COMANDOS DESDE BACKEND ========
  if (Serial.available() > 0) {
    String message = Serial.readStringUntil('\n');
    message.trim();

    if (message.equals("ON")) {
      digitalWrite(LED1, HIGH);
    } else if (message.equals("OFF")) {
      digitalWrite(LED1, LOW);
    }
  }

  delay(dt);
}
