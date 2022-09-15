import { Button, Card, Snackbar, TextField, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { useQuery } from 'react-query'
import { cardBg } from '../constants'
import { getLyrics } from '../functions/lyrics'
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FindLyrics() {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [song, setSong] = React.useState("");
    const [artist, setArtist] = React.useState("");
    const [title, setTitle] = React.useState("");

    const { data, error, isFetching, refetch } = useQuery('lyrics', () => getLyrics(title, artist), {
        enabled: false,
        refetchOnWindowFocus: false,
        retry: false,
        onSuccess: async (res) => {
            res.json().then(data => setSong(data))
        }
    })

    const Search = (e) => {
        if (artist.trim().length == 0 || title.trim().length == 0) {
            setOpen(true)
        }
        else {
            refetch()
        }
    }

    console.log()

    return (
        <>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Input format incorrect.
                </Alert>
            </Snackbar>
            <Card style={{ width: '80%', background: cardBg, marginBottom: '2em' }}>
                <div>
                    <TextField
                        onChange={(event) => setArtist(event.target.value)}
                        style={{ margin: '1em' }}
                        label="Artist"
                    />
                    <TextField
                        onChange={(event) => setTitle(event.target.value)}
                        style={{ margin: '1em', width: '500px' }}
                        label="Title"
                    />
                    <Button variant="contained" style={{ margin: '1em', padding: '1.2em' }} onClick={Search}>Search</Button>
                </div>
                <div style={{ textAlign: 'center', width: '100%', marginBottom: '2em' }}>
                    {isFetching
                        ? <CircularProgress />
                        : error || (data && song && song?.message?.header.status_code != 200)
                            ? <Typography variant="h6" color={"red"} style={{ margin: '1em', fontWeight: 700 }}>Couldn't Find The Requested Song</Typography>
                            : song
                                ? <>
                                    <h2>Lyrics</h2>
                                    <h4 style={{ margin: '5em', marginTop: '1em', marginBottom: '1em' }}>{song?.message?.body?.lyrics?.lyrics_body.replace("******* This Lyrics is NOT for Commercial use *******", "").split("\n").map(line => <span key={Math.random()} style={{ display: 'block' }}>{line}</span>)}</h4>
                                    <sub>{song?.message?.body?.lyrics?.lyrics_copyright}</sub><br />
                                    <sub style={{ color: 'red' }}>{(data && song?.message?.body?.lyrics.explicit !== 0)
                                        ? "Explicit Content Alert"
                                        : ""
                                    }</sub>
                                </>
                                : <></>
                    }
                </div>
            </Card >
        </>
    )
}

export default FindLyrics