import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MoneyIcon from '@material-ui/icons/LocalAtm';
import StarIcon from '@material-ui/icons/Star';
import HeartIcon from '@material-ui/icons/Favorite';
import GrowthIcon from '@material-ui/icons/LocalFlorist';
import LinearProgress from '@material-ui/core/LinearProgress';
import '../styles/Plant.scss';
const Plant = ({ plant }) => {
    return (
        <Card className="plantCard">
            <CardActionArea>
                <CardMedia
                    className="plantImage"
                    image="src/img/rose.jpg"
                    title="Plant Image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {plant.name}
                    </Typography>

                    <div className="plantInfo"><StarIcon />Experience: {plant.experience}</div>
                    <div className="plantInfo"><MoneyIcon /> Gain: {plant.money * 2}</div>

                    <div className="plantProgress">
                        <div className="plantInfo">
                            <GrowthIcon className="iconGrowth" />
                            <LinearProgress className="progress" variant="determinate" value={(plant.growth / plant.growthTime) * 100} />
                        </div>
                        <div className="plantInfo">
                            <HeartIcon className="iconHeart" />
                            <LinearProgress className="progress" color="secondary" variant="determinate" value={(plant.life / plant.lifeTime) * 100} />
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Water
                </Button>
                <Button size="small" color="primary">
                    Collect
                </Button>
                <Button size="small" color="primary">
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};

export default Plant;