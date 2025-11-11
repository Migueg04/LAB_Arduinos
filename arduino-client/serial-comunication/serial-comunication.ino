 int LED1 = 10;
int POTEN = A1;
int potValue;
int dimmer;

void setup() {
  pinMode(LED1, OUTPUT);
  pinMode(POTEN, INPUT);
  Serial.begin(9600);
  
}

void loop() {
  digitalWrite(LED1, HIGH);  // 🔥 Prende el LED sin depender del serial
  delay(1000);               // Espera 1 segundo para que lo veas
  potValue = analogRead(POTEN);                                 // lee el valor del potenciometro
  dimmer = map(potValue, 0, 1023, 0, 255);                      // convierte el rango análogo a digital
  String jsonString = "{\"potValue\":" + String(dimmer) + "}";  // example of reading as json

  Serial.println(jsonString);  // send data through serial to any device or server who wants to read those data

  if (Serial.available() > 0) {
    String message = Serial.readStringUntil('\n');  // lee los datos que entran pero hasta que encuentre un salto de línea.
    if (message.equals("ON")) {
      digitalWrite(LED1, HIGH);
    } else if (message.equals("OFF")) {
      digitalWrite(LED1, LOW);
    }
  }

  delay(100);
}
