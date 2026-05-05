import { SectionContent, Exercise } from './types';

export const SECTIONS: SectionContent[] = [
  {
    id: 'fundamentals',
    title: '1. PLC Fundamentals',
    titleAm: '1. የ PLC መሰረታዊ ነገሮች',
    content: `
### What is PLC?
A Programmable Logic Controller (PLC) is a ruggedized industrial computer used for automation of electromechanical processes.

### History and Evolution
- **1968**: General Motors issues a request for a "Standard Machine Controller".
- **1969**: Modicon 084 was the first practical PLC.
- **Relay Replacement**: PLCs were designed to replace hard-wired relay logic panels.

### Old Schematic vs PLC Logic
**Old Relay Logic**: Complex wiring, physically hard to troubleshoot, consumes massive space.
**PLC Logic**: Software-based, easy to modify, compact, and provides remote monitoring.

| Feature | Conventional Relay | PLC System |
|---------|---------------------|------------|
| Logic | Hard-wired | Software |
| Space | Large | Compact |
| Changes | Rewiring required | Reprogramming |
| Speed | Slow (Mechanical) | Fast (Solid-state) |
    `,
    contentAm: `
### PLC ምንድን ነው?
ፕሮግራማብል ሎጂክ ኮንትሮለር (PLC) የኢንዱስትሪ ኮምፒዩተር ሲሆን የኤሌክትሮ መካኒካል ሂደቶችን በራስ-ሰር ለመቆጣጠር ያገለግላል።

### ታሪክ እና እድገት
- **1968**: ጄኔራል ሞተርስ "ስታንዳርድ ማሽን ኮንትሮለር" እንዲሰራ ጠየቀ።
- **1969**: ሞዲኮን 084 የመጀመሪያው ተግባራዊ PLC ነበር።
- **የሬሌይ መተካት**: PLC የተነደፉት በሽቦ የተገናኙ የሬሌይ ሎጂክ ፓነሎችን ለመተካት ነበር።

### የድሮው ንድፍ (Schematic) ከአዲሱ PLC ሎጂክ ጋር ሲነጻጸር
**የድሮው የሬሌይ ሎጂክ**: ውስብስብ ሽቦ፣ ለመጠገን አስቸጋሪ እና ብዙ ቦታ የሚይዝ ነበር።
**የ PLC ሎጂክ**: በሶፍትዌር ላይ የተመሰረተ፣ በቀላሉ የሚቀየር፣ አነስተኛ ቦታ የሚይዝ እና የርቀት ክትትልን የሚፈቅድ ነው።
    `,
    examples: [
      {
        title: "Old Relay Schematic (DOL)",
        titleAm: "የድሮው የሬሌይ ንድፍ (DOL)",
        logic: `
[L1]-------[STOP_NC]----[START_NO]----( CONTACTOR )----[N]
                |          |
                +---[AUX]--+
        `,
        description: "Hard-wired logic using physical buttons and auxiliary contacts for latching.",
        descriptionAm: "ለማስነሻ እና ለማቆም በአካል የተገናኙ በተኖች እና ኮንታክተሮች።"
      },
      {
        title: "PLC Schematic & Logic (DOL)",
        titleAm: "የ PLC ንድፍ እና ሎጂክ (DOL)",
        logic: `
INPUTS: [L1]--[STOP]--(I:0/0)   [L1]--[START]--(I:0/1)
LOGIC:  |--[ I:0/1 ]--[ /I:0/0 ]-------( O:0/0 )---|
        |--[ O:0/0 ]-------------------------------|
OUTPUT: [L1]--[ O:0/0 contact ]---( COIL )---[N]
        `,
        description: "Physical wiring is only for sensors. Logic is handle inside the CPU.",
        descriptionAm: "ሽቦዎቹ ለሴንሰሮች ብቻ ናቸው። ሎጂኩ በ CPU ውስጥ ይሰራል ተክቷል።"
      }
    ],
    quiz: [
      {
        question: "Which component did the PLC primarily replace in industrial panels?",
        questionAm: "PLC በኢንዱስትሪ ፓነሎች ውስጥ በዋናነት የትኛውን አካል ተክቷል?",
        options: ["Microprocessors", "Hard-wired Relays", "Transistors", "Cloud Servers"],
        optionsAm: ["ማይክሮፕሮሰሰሮች", "በሽቦ የተገናኙ ሬሌዮች", "ትራንዚስተሮች", "ክላውድ ሰርቨሮች"],
        correctAnswer: 1,
        explanation: "PLCs were invented to replace large, inflexible relay logic panels.",
        explanationAm: "PLC የተፈጠሩት ትላልቅ እና የማይለዋወጡ የሬሌይ ሎጂክ ፓነሎችን ለመተካት ነው።"
      }
    ]
  },
  {
    id: 'hardware',
    title: '2. PLC Hardware',
    titleAm: '2. የ PLC ሃርድዌር',
    content: `
### CPU & Memory
The CPU executes the user program and monitors system health. Memory stores the program, I/O status, and data values.

### I/O Modules
- **Digital Input (DI)**: Switches, pushbuttons, sensors.
- **Digital Output (DO)**: Contactors, lamps, solenoid valves.
- **Analog Input (AI)**: Temperature, pressure, level transmitters (4-20mA).
- **Analog Output (AO)**: Control valves, VFD speed setpoints (0-10V).

### Wiring Standards
Standard industrial wiring typically uses **24V DC** for control logic to ensure safety.
    `,
    contentAm: `
### CPU እና ሜሞሪ
CPU የተጠቃሚውን ፕሮግራም ያስፈጽማል እና የስርዓቱን ጤና ይከታተላል። ሜሞሪ ፕሮግራሙን፣ የ I/O ሁኔታን እና የዳታ እሴቶችን ያከማቻል።

### I/O ሞጁሎች
- **ዲጂታል ኢንፑት (DI)**: ስዊቾች፣ ፑሽ በተኖች፣ ሴንሰሮች።
- **ዲጂታል አውትፑት (DO)**: ኮንታክተሮች፣ ላምፖች፣ ሶሌኖይድ ቫልቮች።
- **አናሎግ ኢንፑት (AI)**: የሙቀት መጠን፣ ግፊት፣ ደረጃ አስተላላፊዎች (4-20mA)።
- **አናሎግ አውትፑት (AO)**: መቆጣጠሪያ ቫልቮች፣ የ VFD የፍጥነት መቆጣጠሪያዎች (0-10V)።

### የሽቦ ስታንዳርዶች
መደበኛ የኢንዱስትሪ ሽቦዎች ለደህንነት ሲባል ብዙውን ጊዜ **24V DC** ይጠቀማሉ።
    `
  },
  {
    id: 'programming-languages',
    title: '5. Programming Languages',
    content: `
### IEC 61131-3 Standard
1. **Ladder Logic (LD)**: Most popular, looks like electrical circuits.
2. **Function Block Diagram (FBD)**: Flow-based logic.
3. **Structured Text (ST)**: High-level text based (IF/THEN/ELSE).
4. **Instruction List (IL)**: Assembley-like (deprecated).
5. **Sequential Function Chart (SFC)**: Steps and transitions.
    `
  },
  {
    id: 'ladder-logic',
    title: '6. Ladder Logic Mastery',
    content: `
### Basic Instructions
- **XIC (Examine if Closed)**: | | 
- **XIO (Examine if Open)**: |/|
- **OTE (Output Energize)**: ( )

### Latching Logic
Essential for keeping a motor running after a momentary start button is released.
    `,
    examples: [
      {
        title: "Motor Self-Latching",
        logic: "|--[ START ]--[ STOP ]-------( MOTOR )--|\n|      |                       |\n|--[ MOTOR ]-------------------|",
        description: "The MOTOR contact in parallel with START keeps the circuit pulsed."
      }
    ]
  },
  {
    id: 'analog-control',
    title: '8. Analog Control',
    content: `
### Signal Types
- **4-20mA**: Industry standard. Advantage: Broken wire detection (0mA).
- **0-10V**: Common for short distances.

### Scaling
Raw values from the PLC (e.g., 0-27648 in Siemens) must be scaled to engineering units (e.g., 0-100 Bar).
    `
  },
  {
    id: 'hmi-scada',
    title: '11. HMI and SCADA',
    content: `
### What is HMI?
Human Machine Interface (HMI) is the user interface that connects an operator to the controller. It displays real-time data and allowing for machine control.

### SCADA
Supervisory Control and Data Acquisition (SCADA) systems are used for high-level process management, often covering entire factories or multiple sites.

### Design Principles
- **Clarity**: High contrast between background and data.
- **Safety**: Emergency stop and critical alarms must be prominent.
- **Navigation**: Logical flow between screens.
    `
  },
  {
    id: 'industrial-comm',
    title: '12. Industrial Communication',
    content: `
### Protocols
- **Modbus RTU/TCP**: Oldest and most widely supported.
- **Profibus/Profinet**: Siemens standard for high-speed data.
- **EtherNet/IP**: Rockwell Automation standard.

### Network Levels
1. **Device Level**: Sensor to PLC (IO-Link).
2. **Control Level**: PLC to PLC / HMI.
3. **Enterprise Level**: SCADA to ERP/Cloud.
    `
  },
  {
    id: 'projects',
    title: '15. Real Industrial Projects',
    titleAm: '15. እውነተኛ የኢንዱስትሪ ፕሮጀክቶች',
    content: `
### 1. Water Tank Automation (Level Control)
Control a pump based on high and low level switches.
- **Logic**: IF LowSwitch=ON AND HighSwitch=OFF THEN Pump=ON. IF HighSwitch=ON THEN Pump=OFF.

### 2. Chemical Mixer Tank
Includes low/high sensors, two chemicals addition, and a discharge valve.
1. **Fill A**: Open Valve A until Mid Level.
2. **Fill B**: Open Valve B until High Level.
3. **Mix**: Agitator ON for 60 seconds.
4. **Discharge**: Open Valve C until Low Level.

### 3. Flour Mill Factory Sample
Automating a grain cleaning and milling process.
- **Sequence Selection**: Manual/Auto modes.
- **Safety**: Emergency stop integration.
- **Logic**: Input Conveyor -> Cleaner -> Buffer Tank -> Mill Motor (VFD controlled).
    `,
    contentAm: `
### 1. የውሃ ታንክ አውቶሜሽን
ፓምፑን በከፍተኛ እና ዝቅተኛ ደረጃ ስዊቾች መቆጣጠር።

### 2. የኬሚካል ሚክሰር ታንክ
ዝቅተኛ/ከፍተኛ ሴንሰሮች፣ ሁለት ኬሚካሎችን መጨመሪያ እና ማፍሰሻ ቫልቭን ያካትታል።
1. **ኬሚካል A**: እስከ መካከለኛ ደረጃ መሙላት።
2. **ኬሚካል B**: እስከ ከፍተኛ ደረጃ መሙላት።
3. **መበጥበጥ**: ለ 60 ሰከንድ ማሽከርከር።
4. **ማፍሰስ**: ቫልቭ C ን በመክፈት እስከ ዝቅተኛ ደረጃ ማስወጣት።

### 3. የዱቄት ፋብሪካ ናሙና
የጥራጥሬ ማጽዳት እና መፍጨት ሂደትን አውቶሜት ማድረግ።
    `,
    examples: [
      {
        title: "Chemical Mixer Sequence",
        titleAm: "የኬሚካል ሚክሰር ቅደም ተከተል",
        logic: "|--[ START ]---[ /HI_LVL ]----( VLV_A )--|\n|--[ MID_LVL ]--[ /HI_LVL ]---( VLV_B )--|\n|--[ HI_LVL ]---[ T_MIX ]-----( MIXER )--|\n|--[ MIX_DONE ]---------------( VLV_DISC )|",
        description: "Sequence from Filling to Mixing to Discharging.",
        descriptionAm: "ከመሙላት እስከ መበጥበጥ እና ማፍሰስ ያለው ቅደም ተከተል።"
      },
      {
        title: "E-Stop Safety Chain",
        titleAm: "የአደጋ ጊዜ ማቆሚያ (E-Stop)",
        logic: "|--[ /E_STOP ]---[ /FAULT ]---( READY )--|\n|--[ READY ]----[ START ]-----( RUN )----|",
        description: "RUN cannot engage if E_STOP is pressed or FAULT exists.",
        descriptionAm: "E_STOP ከተጫነ ወይም ችግር ካለ RUN አይሰራም።"
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: '13. PLC Troubleshooting',
    content: `
### Systematic Approach
1. **Check Power**: Is the 24V DC PSU active?
2. **CPU Status**: Is the 'RUN' LED on? Is there a 'FAULT' LED?
3. **I/O LEDs**: Check if physical inputs are reaching the module.
4. **Online Monitoring**: Go online with the software to see logic flow.
    `
  },
  {
    id: 'electrical-basics',
    title: '3. Electrical Basics',
    content: `
### Fundamental Concepts
- **Voltage (V)**: Electrical pressure (24V DC / 230V AC).
- **Current (I)**: Flow of electrons.
- **Resistance (R)**: Opposition to flow.

### Sensors & Actuators
- **Switches**: Manual control elements.
- **Relays**: Electromagnetic switches for isolation.
- **Contactors**: High-power relays for motors.
    `
  },
  {
    id: 'inputs-outputs',
    title: '4. Inputs and Outputs (I/O)',
    content: `
### Wiring Types
- **Sinking (NPN)**: Input is triggered when connected to GND.
- **Sourcing (PNP)**: Input is triggered when connected to +24V.

### Analog Signals
- **4-20mA**: Current loop (best for noise immunity).
- **0-10V**: Voltage signal (common for VFD speed).
    `
  },
  {
    id: 'timers-counters',
    title: '7. Timers and Counters',
    content: `
### Timers
1. **TON (On-Delay)**: Delays turning ON.
2. **TOF (Off-Delay)**: Delays turning OFF.
3. **RTO (Retentive)**: Accumulates time even if input stops.

### Counters
1. **CTU (Count Up)**: Increments value.
2. **CTD (Count Down)**: Decrements value.
3. **RES (Reset)**: Resets the counter to zero.
    `
  },
  {
    id: 'sensors',
    title: '9. Sensors & Field Devices',
    content: `
### Common Sensors
- **Proximity**: Detects metal without contact.
- **Photoelectric**: Uses light beams to detect objects.
- **Ultrasonic**: Uses sound waves for distance/level.
- **Thermocouple/RTD**: For temperature measurement.
    `
  },
  {
    id: 'motors-drives',
    title: '10. Motors and Drives',
    titleAm: '10. ሞተሮች እና ድራይቮች',
    content: `
### Motor Starting Methods
- **DOL (Direct On Line)**: Full voltage is applied. Simple but causes high inrush current.
- **Star-Delta**: Reduces starting current by 1/3. Uses three contactors.
- **VFD**: Controls speed and torque by varying frequency.

### Star-Delta Connection Logic
Star-Delta starting starts the motor in **Star** (low current) then switches to **Delta** (full power) after a few seconds.

**Sequence**:
1. Line + Star contactors ON.
2. Wait (Timer T1).
3. Star contactor OFF.
4. Delta contactor ON.
    `,
    contentAm: `
### የሞተር ማስጀመሪያ ዘዴዎች
- **DOL**: ሙሉ ቮልቴጅ በቀጥታ መስጠት። ቀላል ቢሆንም ብዙ የጅማሬ ኤሌክትሪክ ይፈልጋል።
- **Star-Delta**: የጅማሬ ኤሌክትሪክን በ 1/3 ይቀንሳል። ሶስት ኮንታክተሮችን ይጠቀማል።
- **VFD**: ፍሪኩዌንሲ በመቀየር የሞተርን ፍጥነት መቆጣጠር።

### የ Star-Delta ግንኙነት ሎጂክ
ሞተሩን በ Star ይጀምራል፣ ከዚያ ከጥቂት ሰከንዶች በኋላ ወደ Delta ይቀየራል።
    `,
    examples: [
      {
        title: "Star-Delta Transition",
        titleAm: "የ Star-Delta ሽግግር",
        logic: "|--[ START ]--[ STOP ]-------( MAIN_M )--|\n|--[ MAIN_M ]---[ /TD1 ]-----( STAR )---|\n|--[ MAIN_M ]----------------( TD1 )----|\n|--[ TD1 ]------[ /STAR ]----( DELTA )--|",
        description: "MAIN starts with STAR. After TD1 finishes, STAR opens and DELTA closes.",
        descriptionAm: "MAIN ኮንታክተር ከ STAR ጋር ይጀምራል። TD1 ሲያልቅ STAR ይቆርጣል Delta ይገባል።"
      }
    ]
  },
  {
    id: 'software-training',
    title: '16. Software Training',
    content: `
### Working with TIA Portal
1. **HW Config**: Drag and drop your PLC rack.
2. **Tag Table**: Map physical %I0.0 to 'Start_PB'.
3. **Logic**: Use 'Program Blocks' (OB, FC, FB).
4. **Download**: Use Ethernet/Profinet to flash the CPU.
    `
  }
];

export const EXERCISES: Exercise[] = [
  ...Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Beginner Circuit Level ${i + 1}`,
    difficulty: 'Beginner' as const,
    description: `Basic logic task #${i + 1}: Implement a ${['AND gate', 'OR gate', 'NAND gate', 'XOR gate'][i % 4]} using only NO/NC contacts.`,
    hint: `For an ${['AND gate (series)', 'OR gate (parallel)', 'NAND gate (NC parallel)', 'XOR gate (A and NOT B)'][i % 4]}, think about the electrical path.`,
    solution: `Solution Logic:\n|--[ ${['A ]---[ B ', 'A ]---|---[ B ', '/A ]---|---[ /B ', 'A ]---[ /B '][i % 4]} ]-------( OUT )--|`
  })),
  ...Array.from({ length: 40 }, (_, i) => ({
    id: i + 31,
    title: `Intermediate Logic Gate ${i + 31}`,
    difficulty: 'Intermediate' as const,
    description: `Sequence control task #${i + 1}: Design a ${['Conveyor belt', 'Water pump', 'Mixer tank', 'Emergency sequence'][i % 4]} with interlocking.`,
    hint: "Use timers (TON) and latching coils.",
    solution: "Solution for intermediate sequence logic involves using self-holding contacts and TON blocks."
  })),
  ...Array.from({ length: 30 }, (_, i) => ({
    id: i + 71,
    title: `Advanced Automation Task ${i + 71}`,
    difficulty: 'Advanced' as const,
    description: `Complex system task #${i + 1}: ${['PID scaling', 'Servo positioning', 'Network diagnostic', 'SCADA data logging'][i % 4]} implementation logic.`,
    hint: "Refer to manufacturer specific manuals for special function blocks.",
    solution: "Advanced solution: Utilize MOVE instructions and MATH blocks for processing."
  }))
];
