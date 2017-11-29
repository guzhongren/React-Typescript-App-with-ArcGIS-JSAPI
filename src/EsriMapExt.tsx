import * as React from 'react';
import { dojoRequire } from 'esri-loader';
import EsriLoader from 'esri-loader-react';
export interface Props {
    onMapViewCreated?: (mapView) => void;
}

interface States {
    loaded?: boolean
}
export default class EsriMapExt extends React.Component<Props> {
    mapContainer;
    mapView;
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }
    ready() {
        this.setState({
            loaded: true
        });
    }
    createMap = () => {
        dojoRequire(['esri/Map', 'esri/views/MapView'], (Map, MapView) => {
            this.mapView = new MapView({
                container: this.mapContainer,
                map: new Map({ basemap: 'dark-gray' })
            });
            this.props.onMapViewCreated(this.mapView);
        });
    }
    componentDidMount() {
        this.createMap();
    };
    render() {
        // you can omit options and it defaults to the latest version
        const options = {
            url: 'https://js.arcgis.com/4.5/'
            // url: '/arcgis_js_api/init.js'
        };
        return (
            <div style={{ height: '100%' }}>
                <EsriLoader options={options} ready={this.ready.bind(this)} />
                <div style={{ height: '100%' }} ref={node => this.mapContainer = node}></div>
            </div>
        );
    }
}
