/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import GoogleMapReact from 'google-map-react';
import { api } from '@/utils/api';
import Loading from '../shared/Loading';
import { GoogleMapExtensionOutput } from '@/schema/extension.schema';

const GoogleMapWidget = () => {
    const { data, isLoading } = api.extension.get.useQuery<GoogleMapExtensionOutput|null, GoogleMapExtensionOutput|null>({ title: 'google_map' })
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };

    if (isLoading) {
        return <div className='flex justify-center items-center w-full h-full'>
            <Loading />
        </div>
    }

    if (!data) {
        return (
            <div className='flex justify-center items-center w-full h-full '>
                Google Map
            </div>
        )
    }

    return (
        <div className='h-full w-full'>
            <GoogleMapReact
             bootstrapURLKeys={{ key: "" }}
             defaultCenter={{lat: Number(data.data.latitude), lng:Number( data.data.longitude)}}
             defaultZoom={defaultProps.zoom}
            >

            </GoogleMapReact>
        </div>
    )
}

export default GoogleMapWidget