
export const translations = {
  English: {
    dashboard: {
      title: 'Welcome to Your Health Dashboard',
      description: 'An overview of your health and wellness journey.',
      featureCards: {
        aiAssistant: {
          title: 'AI Assistant',
          description: 'Get instant health advice based on your symptoms.',
          cta: 'Check Symptoms',
        },
        appointments: {
          title: 'Appointments',
          description: 'Schedule and manage your doctor appointments.',
          cta: 'Book Now',
        },
        healthTracker: {
          title: 'Health Tracker',
          description: 'Monitor your vital signs and medication schedule.',
          cta: 'Track Health',
        },
        healthRecords: {
          title: 'Health Records',
          description: 'Access your complete medical history securely.',
          cta: 'View Records',
        },
      },
      reminders: {
        title: 'Upcoming Reminders',
        description: "Don't miss your next dose or appointment.",
        medication: 'Take Vitamin D supplement at 9:00 AM.',
        appointment: 'Follow-up with Dr. Sharma at 3:00 PM.',
      },
    },
    symptomChecker: {
      page: {
        title: 'AI Symptom Checker',
        description: 'Describe your symptoms via text, image, or voice for a preliminary analysis.',
        tabs: {
          text: 'Text',
          image: 'Image',
          voice: 'Voice',
        },
      },
      text: {
        title: 'Describe Your Symptoms',
        description: 'Provide a detailed description of how you are feeling.',
        languageLabel: 'Response Language',
        languagePlaceholder: 'Select a language',
        symptomsLabel: 'Your Symptoms',
        symptomsPlaceholder: 'e.g., I have a headache and a slight fever...',
        getAdviceButton: 'Get Advice',
        analyzingButton: 'Analyzing...',
        resultTitle: "AI's Preliminary Advice",
        readAloudButton: 'Read Aloud',
        pauseButton: 'Pause',
        disclaimer: {
          title: 'Disclaimer',
          text: 'This is a preliminary analysis and not a substitute for professional medical advice. Please consult a doctor for an accurate diagnosis.',
        },
      },
      image: {
        title: 'Upload an Image',
        description: 'Upload a picture of a visible symptom (e.g., skin rash, wound) for analysis.',
        uploadArea: 'Click to upload or drag and drop an image',
        optionalDescriptionLabel: 'Optional Description',
        optionalDescriptionPlaceholder: 'Add any relevant details about the symptom...',
        analyzeButton: 'Analyze Image',
        analyzingButton: 'Analyzing...',
        resultTitle: "AI's Image Analysis",
        preliminaryDiagnosisLabel: 'Preliminary Diagnosis',
        assessedSeverityLabel: 'Assessed Severity',
        recommendationLabel: 'Recommendation',
        disclaimer: {
          title: 'Disclaimer',
          text: 'This is a preliminary analysis and not a substitute for professional medical advice. Please consult a doctor for an accurate diagnosis.',
        },
      },
      voice: {
        title: 'Describe Your Symptoms by Voice',
        description: 'Press the button and speak. Describe your symptoms in your chosen language.',
        languageLabel: 'Response Language',
        languagePlaceholder: 'Select a language',
        startRecording: 'Press the microphone to start recording',
        recording: 'Recording... Press again to stop.',
        analyzing: 'Analyzing your recording...',
        resultTitle: "AI's Voice Analysis",
        possibleCausesLabel: 'Possible Causes',
        suggestedNextStepsLabel: 'Suggested Next Steps',
        disclaimer: {
          title: 'Disclaimer',
          text: 'This is a preliminary analysis and not a substitute for professional medical advice. Please consult a doctor for an accurate diagnosis.',
        },
      },
    },
    appointments: {
        title: "Manage Appointments",
        description: "Book new appointments and view your upcoming schedule.",
        form: {
            title: "Book an Appointment",
            description: "Select a doctor and a time that works for you.",
            doctorLabel: "Doctor",
            doctorPlaceholder: "Select a doctor",
            dateLabel: "Date",
            timeSlotLabel: "Time Slot",
            timeSlotPlaceholder: "Select a time",
            button: "Confirm Appointment",
            loadingButton: "Booking...",
            successTitle: "Appointment Booked!",
            successDescription: "Your appointment with {doctorName} is confirmed for {date} at {timeSlot}."
        },
        upcoming: {
            title: "Upcoming Appointments",
            description: "Here are your scheduled consultations.",
            cancelButton: "Cancel",
            noAppointments: "No upcoming appointments."
        }
    },
    healthTracker: {
        title: "Health Tracker",
        description: "Manage your medication schedule.",
        tabs: {
            medication: "Medication"
        },
        addMedication: {
            button: "Add Medication",
            title: "Add New Medication",
            description: "Fill in the details of your new medication.",
            nameLabel: "Medication Name",
            namePlaceholder: "e.g., Paracetamol",
            dosageLabel: "Dosage",
            dosagePlaceholder: "e.g., 500mg",
            timeLabel: "Time (24h format)",
            typeLabel: "Type",
            typePlaceholder: "Select type",
            submitButton: "Add Medication"
        },
        schedule: {
            title: "Today's Medication",
            description: "Check off your medications as you take them.",
            takenHeader: "Taken",
            medicationHeader: "Medication",
            dosageHeader: "Dosage",
            timeHeader: "Time"
        }
    },
    healthRecords: {
        title: "Health Records",
        description: "Access your complete medical history.",
        cardTitle: "Your Medical Records",
        cardDescription: "A log of your past consultations and reports.",
        notesLabel: "Consultation Notes:",
        reportsLabel: "Attached Reports:",
        downloadButton: "Download"
    }
  },
  Kannada: {
    dashboard: {
      title: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಸುಸ್ವಾಗತ',
      description: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಮತ್ತು ಸ್ವಾಸ್ಥ್ಯದ ಪ್ರಯಾಣದ ಒಂದು ಅವಲೋಕನ.',
      featureCards: {
        aiAssistant: {
          title: 'AI ಸಹಾಯಕ',
          description: 'ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ ತಕ್ಷಣದ ಆರೋಗ್ಯ ಸಲಹೆ ಪಡೆಯಿರಿ.',
          cta: 'ರೋಗಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
        },
        appointments: {
          title: 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು',
          description: 'ನಿಮ್ಮ ವೈದ್ಯರ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳನ್ನು ನಿಗದಿಪಡಿಸಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ.',
          cta: 'ಈಗಲೇ ಬುಕ್ ಮಾಡಿ',
        },
        healthTracker: {
          title: 'ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕರ್',
          description: 'ನಿಮ್ಮ ಪ್ರಮುಖ ಚಿಹ್ನೆಗಳು ಮತ್ತು ಔಷಧಿ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.',
          cta: 'ಆರೋಗ್ಯವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
        },
        healthRecords: {
          title: 'ಆರೋಗ್ಯ ದಾಖಲೆಗಳು',
          description: 'ನಿಮ್ಮ ಸಂಪೂರ್ಣ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರವೇಶಿಸಿ.',
          cta: 'ದಾಖಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
        },
      },
      reminders: {
        title: 'ಮುಂಬರುವ ಜ್ಞಾಪನೆಗಳು',
        description: 'ನಿಮ್ಮ ಮುಂದಿನ ಡೋಸ್ ಅಥವಾ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಅನ್ನು ತಪ್ಪಿಸಿಕೊಳ್ಳಬೇಡಿ.',
        medication: 'ಬೆಳಗ್ಗೆ 9:00 ಗಂಟೆಗೆ ವಿಟಮಿನ್ ಡಿ ಸಪ್ಲಿಮೆಂಟ್ ತೆಗೆದುಕೊಳ್ಳಿ.',
        appointment: 'ಸಂಜೆ 3:00 ಗಂಟೆಗೆ ಡಾ. ಶರ್ಮಾ ಅವರೊಂದಿಗೆ ಫಾಲೋ-ಅಪ್ ಮಾಡಿ.',
      },
    },
    symptomChecker: {
        page: {
            title: 'AI ರೋಗಲಕ್ಷಣ ಪರೀಕ್ಷಕ',
            description: 'ಪ್ರಾಥಮಿಕ ವಿಶ್ಲೇಷಣೆಗಾಗಿ ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಪಠ್ಯ, ಚಿತ್ರ ಅಥವಾ ಧ್ವನಿಯ ಮೂಲಕ ವಿವರಿಸಿ.',
            tabs: {
                text: 'ಪಠ್ಯ',
                image: 'ಚಿತ್ರ',
                voice: 'ಧ್ವನಿ',
            },
        },
        text: {
            title: 'ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ',
            description: 'ನೀವು ಹೇಗೆ ಭಾವಿಸುತ್ತಿದ್ದೀರಿ ಎಂಬುದರ ಕುರಿತು ವಿವರವಾದ ವಿವರಣೆಯನ್ನು ನೀಡಿ.',
            languageLabel: 'ಪ್ರತಿಕ್ರಿಯೆ ಭಾಷೆ',
            languagePlaceholder: 'ಒಂದು ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
            symptomsLabel: 'ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳು',
            symptomsPlaceholder: 'ಉದಾಹರಣೆಗೆ, ನನಗೆ ತಲೆನೋವು ಮತ್ತು ಸ್ವಲ್ಪ ಜ್ವರವಿದೆ...',
            getAdviceButton: 'ಸಲಹೆ ಪಡೆಯಿರಿ',
            analyzingButton: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
            resultTitle: "AI ಯ ಪ್ರಾಥಮಿಕ ಸಲಹೆ",
            readAloudButton: 'ಗಟ್ಟಿಯಾಗಿ ಓದಿ',
            pauseButton: 'ವಿರಾಮ',
            disclaimer: {
                title: 'ಹಕ್ಕು ನಿರಾಕರಣೆ',
                text: 'ಇದು ಪ್ರಾಥಮಿಕ ವಿಶ್ಲೇಷಣೆಯಾಗಿದೆ ಮತ್ತು ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆಗೆ ಬದಲಿಯಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಖರವಾದ ರೋಗನಿರ್ಣಯಕ್ಕಾಗಿ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
            },
        },
        image: {
            title: 'ಒಂದು ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
            description: 'ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಗೋಚರ ರೋಗಲಕ್ಷಣದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ (ಉದಾ., ಚರ್ಮದ ದದ್ದು, ಗಾಯ).',
            uploadArea: 'ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿಗೆ ಎಳೆಯಿರಿ',
            optionalDescriptionLabel: 'ಐಚ್ಛಿಕ ವಿವರಣೆ',
            optionalDescriptionPlaceholder: 'ರೋಗಲಕ್ಷಣದ ಬಗ್ಗೆ ಯಾವುದೇ ಸಂಬಂಧಿತ ವಿವರಗಳನ್ನು ಸೇರಿಸಿ...',
            analyzeButton: 'ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
            analyzingButton: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
            resultTitle: "AI ಯ ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆ",
            preliminaryDiagnosisLabel: 'ಪ್ರಾಥಮಿಕ ರೋಗನಿರ್ಣಯ',
            assessedSeverityLabel: 'ಮೌಲ್ಯಮಾಪನ ಮಾಡಿದ ತೀವ್ರತೆ',
            recommendationLabel: 'ಶಿಫಾರಸು',
            disclaimer: {
                title: 'ಹಕ್ಕು ನಿರಾಕರಣೆ',
                text: 'ಇದು ಪ್ರಾಥಮಿಕ ವಿಶ್ಲೇಷಣೆಯಾಗಿದೆ ಮತ್ತು ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆಗೆ ಬದಲಿಯಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಖರವಾದ ರೋಗನಿರ್ಣಯಕ್ಕಾಗಿ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
            },
        },
        voice: {
            title: 'ಧ್ವನಿಯ ಮೂಲಕ ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ',
            description: 'ಬಟನ್ ಒತ್ತಿ ಮತ್ತು ಮಾತನಾಡಿ. ನಿಮ್ಮ ಆಯ್ಕೆಮಾಡಿದ ಭಾಷೆಯಲ್ಲಿ ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ.',
            languageLabel: 'ಪ್ರತಿಕ್ರಿಯೆ ಭಾಷೆ',
            languagePlaceholder: 'ಒಂದು ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
            startRecording: 'ರೆಕಾರ್ಡಿಂಗ್ ಪ್ರಾರಂಭಿಸಲು ಮೈಕ್ರೊಫೋನ್ ಒತ್ತಿರಿ',
            recording: 'ರೆಕಾರ್ಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ... ನಿಲ್ಲಿಸಲು ಮತ್ತೆ ಒತ್ತಿರಿ.',
            analyzing: 'ನಿಮ್ಮ ರೆಕಾರ್ಡಿಂಗ್ ಅನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
            resultTitle: "AI ಯ ಧ್ವನಿ ವಿಶ್ಲೇಷಣೆ",
            possibleCausesLabel: 'ಸಂಭವನೀಯ ಕಾರಣಗಳು',
            suggestedNextStepsLabel: 'ಸೂಚಿಸಲಾದ ಮುಂದಿನ ಕ್ರಮಗಳು',
            disclaimer: {
                title: 'ಹಕ್ಕು ನಿರಾಕರಣೆ',
                text: 'ಇದು ಪ್ರಾಥಮಿಕ ವಿಶ್ಲೇಷಣೆಯಾಗಿದೆ ಮತ್ತು ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆಗೆ ಬದಲಿಯಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಖರವಾದ ರೋಗನಿರ್ಣಯಕ್ಕಾಗಿ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
            },
        },
    },
    appointments: {
        title: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
        description: "ಹೊಸ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳನ್ನು ಬುಕ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಮುಂಬರುವ ವೇಳಾಪಟ್ಟಿಯನ್ನು ವೀಕ್ಷಿಸಿ.",
        form: {
            title: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
            description: "ನಿಮಗೆ ಸರಿಹೊಂದುವ ವೈದ್ಯರನ್ನು ಮತ್ತು ಸಮಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
            doctorLabel: "ವೈದ್ಯರು",
            doctorPlaceholder: "ವೈದ್ಯರನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            dateLabel: "ದಿನಾಂಕ",
            timeSlotLabel: "ಸಮಯ ಸ್ಲಾಟ್",
            timeSlotPlaceholder: "ಸಮಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            button: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಖಚಿತಪಡಿಸಿ",
            loadingButton: "ಬುಕಿಂಗ್...",
            successTitle: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಲಾಗಿದೆ!",
            successDescription: "{doctorName} ಅವರೊಂದಿಗಿನ ನಿಮ್ಮ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ {date} ರಂದು {timeSlot} ಕ್ಕೆ ಖಚಿತಗೊಂಡಿದೆ."
        },
        upcoming: {
            title: "ಮುಂಬರುವ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು",
            description: "ನಿಮ್ಮ ನಿಗದಿತ ಸಮಾಲೋಚನೆಗಳು ಇಲ್ಲಿವೆ.",
            cancelButton: "ರದ್ದುಮಾಡಿ",
            noAppointments: "ಮುಂಬರುವ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳಿಲ್ಲ."
        }
    },
    healthTracker: {
        title: "ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕರ್",
        description: "ನಿಮ್ಮ ಔಷಧಿ ವೇಳಾಪಟ್ಟಿಯನ್ನು ನಿರ್ವಹಿಸಿ.",
        tabs: {
            medication: "ಔಷಧಿ"
        },
        addMedication: {
            button: "ಔಷಧಿ ಸೇರಿಸಿ",
            title: "ಹೊಸ ಔಷಧಿ ಸೇರಿಸಿ",
            description: "ನಿಮ್ಮ ಹೊಸ ಔಷಧಿಯ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
            nameLabel: "ಔಷಧಿಯ ಹೆಸರು",
            namePlaceholder: "ಉದಾ., ಪ್ಯಾರಸಿಟಮಾಲ್",
            dosageLabel: "ಡೋಸೇಜ್",
            dosagePlaceholder: "ಉದಾ., 500mg",
            timeLabel: "ಸಮಯ (24ಗಂ ಸ್ವರೂಪ)",
            typeLabel: "ಪ್ರಕಾರ",
            typePlaceholder: "ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            submitButton: "ಔಷಧಿ ಸೇರಿಸಿ"
        },
        schedule: {
            title: "ಇಂದಿನ ಔಷಧಿ",
            description: "ನೀವು ತೆಗೆದುಕೊಳ್ಳುವಾಗ ನಿಮ್ಮ ಔಷಧಿಗಳನ್ನು ಗುರುತಿಸಿ.",
            takenHeader: "ತೆಗೆದುಕೊಂಡಿದೆ",
            medicationHeader: "ಔಷಧಿ",
            dosageHeader: "ಡೋಸೇಜ್",
            timeHeader: "ಸಮಯ"
        }
    },
    healthRecords: {
        title: "ಆರೋಗ್ಯ ದಾಖಲೆಗಳು",
        description: "ನಿಮ್ಮ ಸಂಪೂರ್ಣ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸವನ್ನು ಪ್ರವೇಶಿಸಿ.",
        cardTitle: "ನಿಮ್ಮ ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳು",
        cardDescription: "ನಿಮ್ಮ ಹಿಂದಿನ ಸಮಾಲೋಚನೆಗಳು ಮತ್ತು ವರದಿಗಳ ಒಂದು ಲಾಗ್.",
        notesLabel: "ಸಮಾಲೋಚನೆ ಟಿಪ್ಪಣಿಗಳು:",
        reportsLabel: "ಲಗತ್ತಿಸಲಾದ ವರದಿಗಳು:",
        downloadButton: "ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ"
    }
  },
  Hindi: {
    dashboard: {
      title: 'आपके स्वास्थ्य डैशबोर्ड में आपका स्वागत है',
      description: 'आपके स्वास्थ्य और कल्याण यात्रा का एक अवलोकन।',
      featureCards: {
        aiAssistant: {
          title: 'एआई सहायक',
          description: 'अपने लक्षणों के आधार पर तुरंत स्वास्थ्य सलाह प्राप्त करें।',
          cta: 'लक्षणों की जाँच करें',
        },
        appointments: {
          title: 'अपॉइंटमेंट्स',
          description: 'अपने डॉक्टर के अपॉइंटमेंट्स को शेड्यूल और प्रबंधित करें।',
          cta: 'अभी बुक करें',
        },
        healthTracker: {
          title: 'स्वास्थ्य ट्रैकर',
          description: 'अपने महत्वपूर्ण संकेतों और दवा अनुसूची की निगरानी करें।',
          cta: 'स्वास्थ्य ट्रैक करें',
        },
        healthRecords: {
          title: 'स्वास्थ्य रिकॉर्ड',
          description: 'अपने संपूर्ण चिकित्सा इतिहास को सुरक्षित रूप से एक्सेस करें।',
          cta: 'रिकॉर्ड देखें',
        },
      },
      reminders: {
        title: 'आगामी अनुस्मारक',
        description: 'अपनी अगली खुराक या अपॉइंटमेंट न चूकें।',
        medication: 'सुबह 9:00 बजे विटामिन डी सप्लीमेंट लें।',
        appointment: 'दोपहर 3:00 बजे डॉ. शर्मा के साथ फॉलो-अप करें।',
      },
    },
     symptomChecker: {
        page: {
            title: 'एआई लक्षण परीक्षक',
            description: 'प्रारंभिक विश्लेषण के लिए अपने लक्षणों का वर्णन पाठ, छवि या आवाज के माध्यम से करें।',
            tabs: {
                text: 'पाठ',
                image: 'छवि',
                voice: 'आवाज़',
            },
        },
        text: {
            title: 'अपने लक्षणों का वर्णन करें',
            description: 'आप कैसा महसूस कर रहे हैं, इसका विस्तृत विवरण प्रदान करें।',
            languageLabel: 'प्रतिक्रिया भाषा',
            languagePlaceholder: 'एक भाषा चुनें',
            symptomsLabel: 'आपके लक्षण',
            symptomsPlaceholder: 'जैसे, मुझे सिरदर्द और हल्का बुखार है...',
            getAdviceButton: 'सलाह लें',
            analyzingButton: 'विश्लेषण हो रहा है...',
            resultTitle: "एआई की प्रारंभिक सलाह",
            readAloudButton: 'जोर से पढ़ें',
            pauseButton: 'रोकें',
            disclaimer: {
                title: 'अस्वीकरण',
                text: 'यह एक प्रारंभिक विश्लेषण है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। कृपया सटीक निदान के लिए डॉक्टर से परामर्श करें।',
            },
        },
        image: {
            title: 'एक छवि अपलोड करें',
            description: 'विश्लेषण के लिए एक दृश्य लक्षण (जैसे, त्वचा पर लाल चकत्ते, घाव) की तस्वीर अपलोड करें।',
            uploadArea: 'अपलोड करने के लिए क्लिक करें या एक छवि खींचें और छोड़ें',
            optionalDescriptionLabel: 'वैकल्पिक विवरण',
            optionalDescriptionPlaceholder: 'लक्षण के बारे में कोई भी प्रासंगिक विवरण जोड़ें...',
            analyzeButton: 'छवि का विश्लेषण करें',
            analyzingButton: 'विश्लेषण हो रहा है...',
            resultTitle: "एआई का छवि विश्लेषण",
            preliminaryDiagnosisLabel: 'प्रारंभिक निदान',
            assessedSeverityLabel: 'आकलित गंभीरता',
            recommendationLabel: 'सिफारिश',
            disclaimer: {
                title: 'अस्वीकरण',
                text: 'यह एक प्रारंभिक विश्लेषण है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। कृपया सटीक निदान के लिए डॉक्टर से परामर्श करें।',
            },
        },
        voice: {
            title: 'आवाज द्वारा अपने लक्षणों का वर्णन करें',
            description: 'बटन दबाएं और बोलें। अपनी चुनी हुई भाषा में अपने लक्षणों का वर्णन करें।',
            languageLabel: 'प्रतिक्रिया भाषा',
            languagePlaceholder: 'एक भाषा चुनें',
            startRecording: 'रिकॉर्डिंग शुरू करने के लिए माइक्रोफ़ोन दबाएँ',
            recording: 'रिकॉर्डिंग हो रही है... रोकने के लिए फिर से दबाएँ।',
            analyzing: 'आपकी रिकॉर्डिंग का विश्लेषण किया जा रहा है...',
            resultTitle: "एआई का आवाज विश्लेषण",
            possibleCausesLabel: 'संभावित कारण',
            suggestedNextStepsLabel: 'सुझाए गए अगले कदम',
            disclaimer: {
                title: 'अस्वीकरण',
                text: 'यह एक प्रारंभिक विश्लेषण है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। कृपया सटीक निदान के लिए डॉक्टर से परामर्श करें।',
            },
        },
    },
    appointments: {
        title: "अपॉइंटमेंट प्रबंधित करें",
        description: "नए अपॉइंटमेंट बुक करें और अपना आगामी शेड्यूल देखें।",
        form: {
            title: "अपॉइंटमेंट बुक करें",
            description: "एक डॉक्टर और एक समय चुनें जो आपके लिए सुविधाजनक हो।",
            doctorLabel: "डॉक्टर",
            doctorPlaceholder: "एक डॉक्टर चुनें",
            dateLabel: "दिनांक",
            timeSlotLabel: "समय स्लॉट",
            timeSlotPlaceholder: "एक समय चुनें",
            button: "अपॉइंटमेंट की पुष्टि करें",
            loadingButton: "बुकिंग...",
            successTitle: "अपॉइंटमेंट बुक हो गया!",
            successDescription: "{doctorName} के साथ आपका अपॉइंटमेंट {date} को {timeSlot} बजे के लिए कन्फर्म हो गया है।"
        },
        upcoming: {
            title: "आगामी अपॉइंटमेंट्स",
            description: "यहां आपके निर्धारित परामर्श हैं।",
            cancelButton: "रद्द करें",
            noAppointments: "कोई आगामी अपॉइंटमेंट नहीं है।"
        }
    },
    healthTracker: {
        title: "स्वास्थ्य ट्रैकर",
        description: "अपनी दवा अनुसूची का प्रबंधन करें।",
        tabs: {
            medication: "दवा"
        },
        addMedication: {
            button: "दवा जोड़ें",
            title: "नई दवा जोड़ें",
            description: "अपनी नई दवा का विवरण भरें।",
            nameLabel: "दवा का नाम",
            namePlaceholder: "उदा., पैरासिटामोल",
            dosageLabel: "खुराक",
            dosagePlaceholder: "उदा., 500mg",
            timeLabel: "समय (24 घंटे प्रारूप)",
            typeLabel: "प्रकार",
            typePlaceholder: "प्रकार चुनें",
            submitButton: "दवा जोड़ें"
        },
        schedule: {
            title: "आज की दवा",
            description: "जब आप अपनी दवाएं लेते हैं तो उन्हें टिक करें।",
            takenHeader: "लिया",
            medicationHeader: "दवा",
            dosageHeader: "खुराक",
            timeHeader: "समय"
        }
    },
    healthRecords: {
        title: "स्वास्थ्य रिकॉर्ड",
        description: "अपने संपूर्ण चिकित्सा इतिहास तक पहुँचें।",
        cardTitle: "आपके मेडिकल रिकॉर्ड",
        cardDescription: "आपके पिछले परामर्शों और रिपोर्टों का एक लॉग।",
        notesLabel: "परामर्श नोट्स:",
        reportsLabel: "संलग्न रिपोर्ट:",
        downloadButton: "डाउनलोड करें"
    }
  },
  Tamil: {
    dashboard: {
      title: 'உங்கள் சுகாதார டாஷ்போர்டுக்கு வரவேற்கிறோம்',
      description: 'உங்கள் உடல்நலம் மற்றும் সুস্থ जीवन பயணத்தின் ஒரு கண்ணோட்டம்.',
      featureCards: {
        aiAssistant: {
          title: 'AI உதவியாளர்',
          description: 'உங்கள் அறிகுறிகளின் அடிப்படையில் உடனடி சுகாதார ஆலோசனையைப் பெறுங்கள்.',
          cta: 'அறிகுறிகளைச் சரிபார்க்கவும்',
        },
        appointments: {
          title: 'சந்திப்புகள்',
          description: 'உங்கள் மருத்துவர் சந்திப்புகளை திட்டமிட்டு நிர்வகிக்கவும்.',
          cta: 'இப்போதே பதிவு செய்யுங்கள்',
        },
        healthTracker: {
          title: 'சுகாதார டிராக்கர்',
          description: 'உங்கள் முக்கிய அறிகுறிகள் மற்றும் மருந்து அட்டவணையை கண்காணிக்கவும்.',
          cta: 'உடல்நலத்தைக் கண்காணிக்கவும்',
        },
        healthRecords: {
          title: 'சுகாதார பதிவுகள்',
          description: 'உங்கள் முழுமையான மருத்துவ வரலாற்றை பாதுகாப்பாக அணுகவும்.',
          cta: 'பதிவுகளைக் காண்க',
        },
      },
      reminders: {
        title: 'வரவிருக்கும் நினைவூட்டல்கள்',
        description: 'உங்கள் அடுத்த டோஸ் அல்லது சந்திப்பைத் தவறவிடாதீர்கள்.',
        medication: 'காலை 9:00 மணிக்கு வைட்டமின் டி சப்ளிமெண்ட் எடுத்துக் கொள்ளுங்கள்.',
        appointment: 'மாலை 3:00 மணிக்கு டாக்டர் சர்மாவுடன் பின்தொடரவும்.',
      },
    },
    symptomChecker: {
        page: {
            title: 'AI அறிகுறி சரிபார்ப்பு',
            description: 'முதன்மை பகுப்பாய்விற்கு உங்கள் அறிகுறிகளை உரை, படம் அல்லது குரல் மூலம் விவரிக்கவும்.',
            tabs: {
                text: 'உரை',
                image: 'படம்',
                voice: 'குரல்',
            },
        },
        text: {
            title: 'உங்கள் அறிகுறிகளை விவரிக்கவும்',
            description: 'நீங்கள் எப்படி உணர்கிறீர்கள் என்பது பற்றிய விரிவான விளக்கத்தை வழங்கவும்.',
            languageLabel: 'பதில் மொழி',
            languagePlaceholder: 'ஒரு மொழியைத் தேர்ந்தெடுக்கவும்',
            symptomsLabel: 'உங்கள் அறிகுறிகள்',
            symptomsPlaceholder: 'எ.கா., எனக்கு தலைவலி மற்றும் லேசான காய்ச்சல் உள்ளது...',
            getAdviceButton: 'ஆலோசனை பெறவும்',
            analyzingButton: 'பகுப்பாய்வு செய்யப்படுகிறது...',
            resultTitle: "AI இன் முதன்மை ஆலோசனை",
            readAloudButton: 'உரக்கப் படியுங்கள்',
            pauseButton: 'இடைநிறுத்து',
            disclaimer: {
                title: 'பொறுப்புத் துறப்பு',
                text: 'இது ஒரு முதன்மை பகுப்பாய்வு மற்றும் தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக இல்லை. தயவுசெய்து துல்லியமான நோயறிதலுக்கு மருத்துவரை அணுகவும்.',
            },
        },
        image: {
            title: 'ஒரு படத்தைப் பதிவேற்றவும்',
            description: 'பகுப்பாய்விற்காக ஒரு புலப்படும் அறிகுறியின் படத்தை (எ.கா., தோல் வெடிப்பு, காயம்) பதிவேற்றவும்.',
            uploadArea: 'பதிவேற்ற கிளிக் செய்யவும் அல்லது ஒரு படத்தை இழுத்து விடவும்',
            optionalDescriptionLabel: 'விருப்ப விளக்கம்',
            optionalDescriptionPlaceholder: 'அறிகுறி பற்றிய எந்தவொரு தொடர்புடைய விவரங்களையும் சேர்க்கவும்...',
            analyzeButton: 'படத்தை பகுப்பாய்வு செய்யவும்',
            analyzingButton: 'பகுப்பாய்வு செய்யப்படுகிறது...',
            resultTitle: "AI இன் பட பகுப்பாய்வு",
            preliminaryDiagnosisLabel: 'முதன்மை நோயறிதல்',
            assessedSeverityLabel: 'மதிப்பிடப்பட்ட தீவிரம்',
            recommendationLabel: 'பரிந்துரை',
            disclaimer: {
                title: 'பொறுப்புத் துறப்பு',
                text: 'இது ஒரு முதன்மை பகுப்பாய்வு மற்றும் தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக இல்லை. தயவுசெய்து துல்லியமான நோயறிதலுக்கு மருத்துவரை அணுகவும்.',
            },
        },
        voice: {
            title: 'குரல் மூலம் உங்கள் அறிகுறிகளை விவரிக்கவும்',
            description: 'பொத்தானை அழுத்தி பேசவும். நீங்கள் தேர்ந்தெடுத்த மொழியில் உங்கள் அறிகுறிகளை விவரிக்கவும்.',
            languageLabel: 'பதில் மொழி',
            languagePlaceholder: 'ஒரு மொழியைத் தேர்ந்தெடுக்கவும்',
            startRecording: 'பதிவைத் தொடங்க மைக்ரோஃபோனை அழுத்தவும்',
            recording: 'பதிவு செய்யப்படுகிறது... நிறுத்த மீண்டும் அழுத்தவும்.',
            analyzing: 'உங்கள் பதிவைப் பகுப்பாய்வு செய்கிறது...',
            resultTitle: "AI இன் குரல் பகுப்பாய்வு",
            possibleCausesLabel: 'சாத்தியமான காரணங்கள்',
            suggestedNextStepsLabel: 'பரிந்துரைக்கப்பட்ட அடுத்தபடிகள்',
            disclaimer: {
                title: 'பொறுப்புத் துறப்பு',
                text: 'இது ஒரு முதன்மை பகுப்பாய்வு மற்றும் தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக இல்லை. தயவுசெய்து துல்லியமான நோயறிதலுக்கு மருத்துவரை அணுகவும்.',
            },
        },
    },
    appointments: {
        title: "சந்திப்புகளை நிர்வகிக்கவும்",
        description: "புதிய சந்திப்புகளை பதிவுசெய்து உங்கள் வரவிருக்கும் அட்டவணையைப் பார்க்கவும்.",
        form: {
            title: "ஒரு சந்திப்பை பதிவு செய்யவும்",
            description: "உங்களுக்கு ஏற்ற ஒரு மருத்துவர் மற்றும் நேரத்தைத் தேர்ந்தெடுக்கவும்.",
            doctorLabel: "மருத்துவர்",
            doctorPlaceholder: "ஒரு மருத்துவரைத் தேர்ந்தெடுக்கவும்",
            dateLabel: "தேதி",
            timeSlotLabel: "நேர ஸ்லாட்",
            timeSlotPlaceholder: "ஒரு நேரத்தைத் தேர்ந்தெடுக்கவும்",
            button: "சந்திப்பை உறுதிப்படுத்தவும்",
            loadingButton: "பதிவுசெய்கிறது...",
            successTitle: "சந்திப்பு பதிவு செய்யப்பட்டது!",
            successDescription: "{doctorName} உடனான உங்கள் சந்திப்பு {date} அன்று {timeSlot} மணிக்கு உறுதி செய்யப்பட்டுள்ளது."
        },
        upcoming: {
            title: "வரவிருக்கும் சந்திப்புகள்",
            description: "உங்கள் திட்டமிடப்பட்ட ஆலோசனைகள் இங்கே உள்ளன.",
            cancelButton: "ரத்துசெய்",
            noAppointments: "வரவிருக்கும் சந்திப்புகள் எதுவும் இல்லை."
        }
    },
    healthTracker: {
        title: "சுகாதார டிராக்கர்",
        description: "உங்கள் மருந்து அட்டவணையை நிர்வகிக்கவும்.",
        tabs: {
            medication: "மருந்து"
        },
        addMedication: {
            button: "மருந்து சேர்க்கவும்",
            title: "புதிய மருந்து சேர்க்கவும்",
            description: "உங்கள் புதிய மருந்தின் விவரங்களை நிரப்பவும்.",
            nameLabel: "மருந்தின் பெயர்",
            namePlaceholder: "எ.கா., பாராசிட்டமால்",
            dosageLabel: "மருந்தளவு",
            dosagePlaceholder: "எ.கா., 500mg",
            timeLabel: "நேரம் (24 மணிநேர வடிவம்)",
            typeLabel: "வகை",
            typePlaceholder: "வகையைத் தேர்ந்தெடுக்கவும்",
            submitButton: "மருந்து சேர்க்கவும்"
        },
        schedule: {
            title: "இன்றைய மருந்து",
            description: "நீங்கள் மருந்துகளை எடுத்துக் கொள்ளும்போது அவற்றைக் குறிக்கவும்.",
            takenHeader: "எடுத்துக்கொண்டது",
            medicationHeader: "மருந்து",
            dosageHeader: "மருந்தளவு",
            timeHeader: "நேரம்"
        }
    },
    healthRecords: {
        title: "சுகாதார பதிவுகள்",
        description: "உங்கள் முழுமையான மருத்துவ வரலாற்றை அணுகவும்.",
        cardTitle: "உங்கள் மருத்துவ பதிவுகள்",
        cardDescription: "உங்கள் கடந்தகால ஆலோசனைகள் மற்றும் அறிக்கைகளின் ஒரு பதிவு.",
        notesLabel: "ஆலோசனை குறிப்புகள்:",
        reportsLabel: "இணைக்கப்பட்ட அறிக்கைகள்:",
        downloadButton: "பதிவிறக்கவும்"
    }
  },
};
