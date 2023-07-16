import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function BasicTable() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [filename, setFileName] = React.useState("");

  const handleTextInputChange = (event) => {
    setFileName(event.target.value);
  };

  const sendRequest = React.useCallback(async () => {
    console.log(filename);
    if (filename === undefined) {
      setIsLoaded(true);
      return;
    }
    fetch("http://10.0.0.4:7878/pikpak/" + filename)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [filename]);

  return (
    <Container>
      <Box>
        <TextField
          id="outlined-basic"
          label="filename"
          variant="outlined"
          size="small"
          onChange={handleTextInputChange}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              {
                sendRequest();
              }
            }
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>no records found</TableCell>
              </TableRow>
            )}
            {items.map((row) => (
              <TableRow
                key={row.name}
                sx={{"&:last-child td, &:last-child th": {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
