import React,{ useState, forwardRef } from 'react';
import { Grid, Box, Slide, Typography,AppBar,Dialog,Toolbar, IconButton} from '@mui/material';
import PostImage from '../PostImg/PostImage';
import moment from 'moment';
import { Close } from '@mui/icons-material';
import './recipeData.css';



//-------------------------------* TANSITION FUNCTION FOR NAV BAR *-------------------------------//

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

  
function RecipeData({recipe}) {

    const [viewRecipe, setViewRecipeOpen] = useState(false);
    const [Title, setTitle] = useState('');
    const [Date, setDate] = useState('');
    const [RecipeText, setRecipeText] = useState('');
    const [RecipeImg, setRecipeImg] = useState([]);

//-------------------------------* VIEW-RECIPE MENU *-------------------------------//
    const handleViewRecipeClickOpen = ((recipe) => {
        setViewRecipeOpen(true);
        setTitle(recipe.title);
        setRecipeImg(recipe.files);
        setDate(recipe.time);
        setRecipeText(recipe.recipe);
    })
    
    const handleViewRecipeClose = (() => {
        setViewRecipeOpen(false);
    })
  
    return (
        <>
            <Grid id="gotoDataOut">
                <h5 id="gotoData" onClick={()=>{handleViewRecipeClickOpen(recipe)}}>View Recipe <i className="fas fa-angle-double-right"></i></h5>
                {
                    RecipeImg ===''
                ?
                    null
                :
                    (
                        <Dialog
                            fullScreen
                            open={viewRecipe}
                            onClose={()=>{handleViewRecipeClose()}}
                            TransitionComponent={Transition}
                            >
                            <AppBar id="DialogBarForRecipe">
                                <Toolbar>
                                    <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={()=>{handleViewRecipeClose()}}
                                    aria-label="close"
                                    >
                                        <Close />
                                    </IconButton>
                                    <Typography sx={{ ml: 2}} variant="h5" id="TitleRecipePage" component="div">
                                        RECIPE
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <Box id="RecipePageImgPart">
                            <Grid id="RecipePageImgContainer">
                                <Grid id="imgOutRecipePageHead">
                                    <PostImage file={RecipeImg} pagination={false} />
                                    <h1>{ Title }</h1>
                                    <h3 className="recipeDate">{moment(Date).fromNow()}</h3>
                                </Grid>
                            </Grid>
                            <Grid id="RecipePageTextContainer">
                                <pre id="RecipeText"> { RecipeText }</pre>
                            </Grid>
                            </Box>
                        </Dialog>
                    )
                }
            </Grid>
        </>
    );
}

export default RecipeData;