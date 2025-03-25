"use client";
import { Scene } from "@/three/Scene";
import { Component } from "react";

export default class Game extends Component {
    componentDidMount(): void {
        const scene = new Scene();

        window.addEventListener('mousedown', scene.mouse.onMouseDown.bind(scene.mouse), false);
        window.addEventListener('mouseup', scene.mouse.onMouseUp.bind(scene.mouse), false);
        window.addEventListener('mousemove', scene.onMouseMove.bind(scene), false);

        setInterval(() => {
            scene.updateSceneData();
        }, 1000)

        scene.start();
    }

    render() {
        return <div id="render-target"></div>
    }
}