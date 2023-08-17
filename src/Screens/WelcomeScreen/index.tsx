// Import react predefined properties
import { useContext } from "react";

// Import user defined context
import { ListeningFunctions } from "..";

// Import MUI properties
import { Box, Button, CardActions, InputLabel, Avatar } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import SquareSharpIcon from "@mui/icons-material/SquareSharp";

// Import styles object
import { Style } from "./styles";

interface ContextRecognition {
  startListening:() => void;
  stopListening:() => void;
  transcript: string;
  listening: boolean;
}

const WelcomeScreen = () => {
  // Get data through created context
  const { startListening, stopListening, listening, transcript }:ContextRecognition =  useContext(ListeningFunctions);

  return (
    <Box sx={Style.labelDivStyle}>
      {!listening ? (
        <InputLabel sx={Style.labelWelcomeTextStyle} >Welcome to VoiceKitt</InputLabel>
      ) : transcript ? (
        <InputLabel sx={Style.labelTranscriptTextStyle}>{transcript}</InputLabel>
      ) : (
        <InputLabel sx={Style.labelTextStyle}>Typescript of voice will show here... </InputLabel>
      )}

      <CardActions sx={Style.cardActionStyle}>
        <Box>
          <InputLabel sx={Style.buttonHelperTextColor}>
            {" "}
            Press here to {!listening ? "start" : "stop"}
          </InputLabel>
          <Button
            size="small"
            color="primary"
            onClick={!listening ? startListening : stopListening}
            sx={Style.buttonStyle }
          >
            <Avatar sx={Style.avatarStyle}>
              {!listening ? <MicIcon /> : <SquareSharpIcon />}
            </Avatar>
          </Button>
        </Box>
      </CardActions>
    </Box>
  );
};
export default WelcomeScreen;
