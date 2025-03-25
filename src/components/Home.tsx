"use client";
import { Component } from "react";
import { Scene } from "@/components/layout/Scene";

export default class HomeComponent extends Component {
    componentDidMount(): void {
        const scene = new Scene();

        window.addEventListener('mousedown', scene.mouse.onMouseDown.bind(scene.mouse), false);
        window.addEventListener('mouseup', scene.mouse.onMouseUp.bind(scene.mouse), false);
        window.addEventListener('mousemove', scene.onMouseMove.bind(scene), false);

        scene.start();
    }

    render() {
        return <div id="render-target"></div>
    }
}