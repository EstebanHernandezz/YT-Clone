import express from 'express';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

const app = express();
//const port = 3000;
app.use(express.json());

app.post('/process-video', (req, res) => {
    //get the path of the input video file from the request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    // Check if the input file path is defined
  if (!inputFilePath || !outputFilePath) {
    return res.status(400).send('Bad Request: Missing file path');
  }

     // Check if input file exists
     if (!fs.existsSync(inputFilePath)) {
        return res.status(400).send('Bad Request: Input file does not exist');
    }

  // Create the ffmpeg command
  ffmpeg(inputFilePath)
    .outputOptions('-vf', 'scale=-1:360') // 360p
    .on('end', function() {
        console.log('Processing finished successfully');
        res.status(200).send('Processing finished successfully');
    })
    .on('error', function(err: any) {
        console.log('An error occurred: ' + err.message);
        res.status(500).send('An error occurred: ' + err.message);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Video processing service listening at http://localhost:${port}`);
});
//