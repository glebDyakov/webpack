import 'babel.js'
import * as $ from 'jquery'
import './styles/styles.css'
import './styles/scss.scss'
import Post from './Post'
import csv from './assets/data.csv'
import WebpackLogo from './assets/webpack-logo.png'
import xml from './assets/data.xml'
import json from './assets/json'
import './styles/less.less'
const post=new Post('webpack post title',WebpackLogo)
$('pre'.html(post.toString()))
// post.toString()
