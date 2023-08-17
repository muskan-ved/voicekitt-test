// Import regenerator-runtime for babel runtime dependency
import "regenerator-runtime/runtime";

// Import third-party libraries
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// Import user defiend components
import WelcomeScreen from "./WelcomeScreen";

// Create context for passing the data to all child components
import { createContext,Context } from "react";

// Import MUI properties
import { Box, Card, CardContent } from "@mui/material";

// Import styles object
import { Style } from "./WelcomeScreen/styles";


interface ListeningFunctionsContextType {
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
  listening: boolean;
}

// Set data through context API
export const ListeningFunctions: Context<ListeningFunctionsContextType> = createContext({} as ListeningFunctionsContextType);

const Screens = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () => {
    // The startfunction() automatically stops when the user stops speaking, For it will continue...
    SpeechRecognition.startListening({ continuous: true });
  };

  // To stop speaking
  const stopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  // If any browser not supports speech recognition
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <ListeningFunctions.Provider
      value={{
        startListening,
        stopListening,
        transcript,
        listening,
      }}
    >
      <Box>
        <Card sx={Style.screenCardStyle}>
          <CardContent sx={Style.screenCardContentStyle}>
            <WelcomeScreen />
          </CardContent>
        </Card>
      </Box>
    </ListeningFunctions.Provider>
  );
};

export default Screens;
