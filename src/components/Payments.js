import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { httpsCallable } from "@firebase/functions";
import { functions } from "../firebase/config";

const Payments = () => {
  const [orderTotal, setOrderTotal] = useState(10000);
  const [docId, setDocId] = useState(101);
  const [mobile, setMobile] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const bgColor = grey[100];
  const textColor = grey[500];

  const handleSubmit = () => {
    const order = {
      docId,
      mobile,
      orderTotal,
    };

    // Get Order ref
    const receiveOrder = httpsCallable(functions, "receiveOrder");
    receiveOrder({ docId, mobile, orderTotal }).then((result) => {
      setConfirmed(result.data);
    });
  };

  return (
    <Container>
      <Box sx={{ width: "50%", mt: "2rem", background: bgColor, mx: "auto" }}>
        <Grid container spacing={3} mb={3}>
          <Grid item md={8} xs={12}>
            <Typography
              variant="h4"
              component="h3"
              sx={{
                display: "inline-block",
                color: textColor,
                fontSize: "1.25rem",
              }}
            >
              Order Details
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
            sx={{
              position: "relative",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{
                position: "absolute",
                right: 0.5,
                bottom: 0.5,
                border: "none",
              }}
            >
              See Details{" "}
            </Button>
          </Grid>
        </Grid>
        <Paper elevation={2}>
          <Grid container spacing={3}>
            <Grid item md={9} xs={12} sx={{ padding: "0.5rem" }}>
              <Typography
                variant="h3"
                component="p"
                sx={{ fontSize: "1.25rem", textAlign: "left" }}
              >
                TOTAL TO PAY
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="h5" color="primary" component="p">
                KES. {orderTotal.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={2} sx={{ mt: "0.5rem" }}>
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            onChange={(e) => setMobile(e.target.value)}
          />
        </Paper>
        <Button
          sx={{ mt: 1 }}
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => handleSubmit()}
        >
          PAY NOW:KES {orderTotal.toFixed(2)}
        </Button>
      </Box>
      <Typography variant="subtitle1">{confirmed || null}</Typography>
    </Container>
  );
};

export default Payments;
