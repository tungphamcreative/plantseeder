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
const Plant = ({ plant, restoreHeath, removePlant, collectPlant }) => {
    return (
        <Card className={'plantCard' + (plant.isDone ? ' donePlant' : '')}>
            <CardActionArea>
                <CardMedia
                    className="plantImage"
                    image={plant.image}
                    title="Plant Image"
                >
                    <div className={plant.isDeath ? 'deathPlant' : ''}></div>
                </CardMedia>
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
            <CardActions className="cardAction">
                <Button
                    size="small"
                    color="primary"
                    onClick={() => restoreHeath(plant.id, plant.lifeTime)}
                    disabled={plant.isDeath || plant.isDone}
                >
                    Water
                </Button>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => collectPlant(plant)}
                    disabled={plant.isDeath || !plant.isDone}
                >
                    Collect
                </Button>
                <Button size="small" color="primary" onClick={() => removePlant(plant.id)}>
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};

export default Plant;