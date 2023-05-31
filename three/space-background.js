const getRandomParticelPos = (particleCount) => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
};

const resizeRendererToDisplaySize = (renderer) => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    // resize only when necessary
    if (needResize) {
        //3rd parameter `false` to change the internal canvas size
        renderer.setSize(width, height, false);
    }
    return needResize;
};

// mouse
let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const main = () => {
    const canvas = document.getElementById("c");
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    // remove this line to customize the background color
    // renderer.setClearColor(new THREE.Color("#1c1624"));
    const scene = new THREE.Scene();

    // light source
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // camera
    const fov = 75,
        aspect = 2,
        near = 1.5,
        far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 1;

    // Geometry
    const geometrys = [new THREE.BufferGeometry(), new THREE.BufferGeometry()];

    geometrys[0].setAttribute(
        "position",
        new THREE.BufferAttribute(getRandomParticelPos(350), 3)
    );
    geometrys[1].setAttribute(
        "position",
        new THREE.BufferAttribute(getRandomParticelPos(1500), 3)
    );

    const loader = new THREE.TextureLoader();

    // material
    const materials = [
        new THREE.PointsMaterial({
            size: 0.05,
            map: loader.load("https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp1.png"),
            transparent: true
        }),
        new THREE.PointsMaterial({
            size: 0.075,
            map: loader.load("https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"),
            transparent: true
        })
    ];

    const starsT1 = new THREE.Points(geometrys[0], materials[0]);
    const starsT2 = new THREE.Points(geometrys[1], materials[1]);
    scene.add(starsT1);
    scene.add(starsT2);

    const render = (time) => {
        //time *= 0.001; //in seconds

        camera.rotation.x = time * 0.00002

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            // changing the camera aspect to remove the strechy problem
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        starsT1.position.x = mouseX * 0.0001;
        starsT1.position.y = mouseY * -0.0001;

        starsT2.position.x = mouseX * 0.0001;
        starsT2.position.y = mouseY * -0.0001;

        // Re-render the scene
        renderer.render(scene, camera);
        // loop
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

main()