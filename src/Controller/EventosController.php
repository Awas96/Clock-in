<?php

namespace App\Controller;

use App\Entity\Evento;
use App\Entity\Turno;
use App\Repository\EventoRepository;
use App\Repository\TurnoRepository;
use App\Repository\UsuarioRepository;
use Datetime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/eventos", name="eventos_")
 */
class EventosController extends AbstractController
{
    /**
     * @Route("/gestion/horarios", name="gestiona_horarios")
     */
    public function base(UsuarioRepository $usuarioRepository): Response
    {
        $usuarios = $usuarioRepository->findAll();
        return $this->render('eventos/base.html.twig', [
            'usuarios' => $usuarios,
            'controller_name' => 'EventosController',
        ]);
    }

    /**
     * @Route("/gestion/horarios/leer", name="gestiona_horarios_leer")
     */
    public function recoger(Request $request, EventoRepository $eventoRepository, TurnoRepository $turnoRepository): Response
    {
        //recoger solo los eventos que nos interesan
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                $params = json_decode($content, true);
                $enEventos = ($eventoRepository->findByUsId($params["idusuario"]));
                $eventos = array();
                dump($enEventos);
                foreach ($enEventos as $ev) {
                    $enTurnos = ($turnoRepository->findByEvento($ev->getId()));
                    foreach ($enTurnos as $et) {
                        array_push($eventos, ["id_evento" => $ev->getId(), "fecha" => $ev->getFecha()->format("Y-m-d"), "id_turno" => $et->getId(), "start" => $et->getHoraInicio()->format("H:i"), "end" => $et->getHoraFin()->format("H:i"), "title" => "Turno"]);
                    }
                }
            }
            return new JsonResponse($eventos);
        }

        return new Response('Error!', 400);
    }


    /**
     * @Route("/gestion/horarios/agregar", name="gestiona_horarios_agregar")
     */
    public
    function agregar(Request $request, UsuarioRepository $usuarioRepository, Evento $evento = null, Turno $turno = null): Response
    {
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                $datos = json_decode($content, true);
                foreach ($datos as $params) {
                    if ($params["tipo"] == "Turno") {
                        $id = $params["id"];
                        $fecha = new Datetime(date('Y-m-d', strtotime($params["fecha"])));
                        $inicio = new Datetime(date('H:i', strtotime($params['inicio'])));
                        $fin = new Datetime(date('H:i', strtotime($params['fin'])));
                        $em = $this->getDoctrine()->getManager();
                        $evento = new Evento();
                        $evento->setFecha($fecha);
                        $evento->setUsuario($usuarioRepository->findByID($id));
                        $em->persist($evento);
                        $em->flush();
                        $turno = new Turno();
                        $turno->setHoraInicio($inicio);
                        $turno->setHoraFin($fin);
                        $turno->setEvento($evento);
                        $em->persist($evento);
                        $em->persist($turno);
                        $em->flush();
                    }
                }

            }

            return new JsonResponse("Datos guardados correctamente!");
        }
        return new Response('Error!', 400);
    }
}
