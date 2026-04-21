import { SectionContent, Exercise } from './types';

export const SECTIONS: SectionContent[] = [
  {
    id: 'fundamentals',
    title: '1. PLC Fundamentals',
    content: `
### What is PLC?
A Programmable Logic Controller (PLC) is a ruggedized industrial computer used for automation of electromechanical processes.

### History and Evolution
- **1968**: General Motors issues a request for a "Standard Machine Controller".
- **1969**: Modicon 084 was the first practical PLC.
- **Relay Replacement**: PLCs were designed to replace hard-wired relay logic panels.

### Major Brands
- **Siemens**: TIA Portal, S7-1200/1500.
- **Allen Bradley**: Studio 5000, ControlLogix.
- **Mitsubishi**: GX Works, iQ-F series.
- **Schneider**: EcoStruxure, Modicon.
    `,
    quiz: [
      {
        question: "Which component did the PLC primarily replace in industrial panels?",
        options: ["Microprocessors", "Hard-wired Relays", "Transistors", "Cloud Servers"],
        correctAnswer: 1,
        explanation: "PLCs were invented to replace large, inflexible relay logic panels."
      }
    ]
  },
  {
    id: 'hardware',
    title: '2. PLC Hardware',
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
    content: `
### 1. Water Tank Automation
Control a pump based on high and low level switches.
- **Logic**: IF LowSwitch=ON AND HighSwitch=OFF THEN Pump=ON. IF HighSwitch=ON THEN Pump=OFF.

### 2. Conveyor Control with Sorting
A conveyor that stops when an object is detected at the end and triggers a pneumatic pusher if the object is 'Metallic'.

### 3. Traffic Light System
A sequence based on timers:
- Green (10s) -> Yellow (3s) -> Red (15s).
- Uses TON (Timer On Delay) blocks.
    `
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
    content: `
### Motor Control
- **DOL Start**: Direct On Line (simple, high inrush).
- **Star-Delta**: Reduced voltage starting.
- **Soft Starter**: Electronic ramp-up.
- **VFD (Variable Frequency Drive)**: Full speed and torque control via PLC.
    `
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
